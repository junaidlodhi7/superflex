var params = {tableName: 'ApiCommandSequence' , body: {}};
const yamlLint = require('yaml-lint');

function list(req , res){
    params.body = {include: ['firmware_version', 'product_version']};
    params.pagination = req.query.pagination;
    return req.db.list(req , res , params);
}

function create(req, res) {
    req.checkBody("name", "Name must be between 2 and 50 characters in length.").isLength({ min: 2 , max: 50 });
    req.checkBody("firmware_version_id", "Invalid firmware version").isInt();
    req.checkBody("product_version_id", "Invalid product version").isInt();
    req.checkBody("api_command_sequence_revision.author", "Invalid sequence revision author").notEmpty();
    req.checkBody("api_command_sequence_revision.version", "Invalid sequence revision version").notEmpty();
    req.checkBody("api_command_sequence_revision.period", "Invalid sequence revision period").notEmpty();
    // req.checkBody("api_command_sequence_revision.period_units", "Invalid sequence revision period units").notEmpty();

    const notes = req.body.api_command_sequence_revision.notes || null;
    if(notes && notes.trim()){
        yamlLint.lint(notes).then(function () {
            params.body = {
                name: req.body.name,
                nice_name: req.body.nice_name,
                description: req.body.description,
                notes: req.body.notes,
                firmware_version_id: req.body.firmware_version_id,
                product_version_id: req.body.product_version_id,
                api_command_sequence_revisions: [{
                    author: req.body.api_command_sequence_revision.author,
                    version: req.body.api_command_sequence_revision.version,
                    period: req.body.api_command_sequence_revision.period,
                    period_units: req.body.api_command_sequence_revision.period_units,
                    notes: notes,
                    description: req.body.api_command_sequence_revision.description
                }]
            };
            params.include = {include: ['api_command_sequence_revisions']};
            return req.db.create(req , res , params);
        }).catch(function (error) {
            console.error('Invalid YAML file.', error);
            return req.db.sendError(error,res)
        });
    }else{
        req.db.sendError('Revision cannot be empty.' , res);
    }
}

function retrieve(req , res) {
    req.checkParams("id", "Invalid api command sequence id").isInt();
    params.body = {where: {id: req.params.id} , include: ['firmware_version' , 'product_version']};
    return req.db.retrieve(req , res , params , function(result){
        var params1 = {pagination: true , tableName: 'ApiCommandSequenceRevision' , body: { where: {api_command_sequence_id: req.params.id}}};
        req.db.list(req , res , params1 , function (data) {
            res.status(200).send({success: true, data: {
                id: result.id,
                name: result.name,
                nice_name: result.nice_name,
                description: result.description,
                notes: result.notes,
                firmware_version: result.firmware_version,
                product_version: result.product_version,
                api_command_sequence_revisions: {data: data.rows, pagination: req.db.pagination(data , req)},
                created_at: result.created_at,
                updated_at: result.updated_at
            }});
        });
    });
}

function update(req,res) {

    req.checkBody("name", "Name must be between 2 and 50 characters in length.").isLength({ min: 2 , max: 50 });
    req.checkBody("firmware_version_id", "Invalid firmware version").isInt();
    req.checkBody("product_version_id", "Invalid product version").isInt();
    req.checkParams("id", "Invalid api command sequence id").isInt();
    params.condition = {where: { id: req.params.id} };
    params.body = {
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        firmware_version_id: req.body.firmware_version_id,
        product_version_id: req.body.product_version_id
    };
    return req.db.update(req , res , params);
}

function destroy(req , res) {
    req.checkParams("id", "Invalid api command sequence id").isInt();
    params.where =  {id: req.params.id};
    return req.db.destroy(req , res , params);
}

module.exports = {
    list: list,
    retrieve: retrieve,
    destroy: destroy,
    update : update,
    create: create
};