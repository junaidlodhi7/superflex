var params = {tableName: 'ApiCommandSequenceRevision' , body: {}};
const yamlLint = require('yaml-lint');


function list(req , res){
    params.body = { include: ['api_command_sequence']};
    params.pagination = req.query.pagination;
    return req.db.list(req , res , params);
}

function create(req, res) {
    req.checkBody("author", "Invalid sequence revision author").notEmpty();
    req.checkBody("version", "Invalid sequence revision version").notEmpty();
    req.checkBody("period", "Invalid sequence revision period").notEmpty();
    // req.checkBody("period_units", "Invalid sequence revision period units").notEmpty();
    req.checkBody("api_command_sequence_id", "invalid api_command_sequence_id").isInt();
    const notes = req.body.notes || null;
    if(notes && notes.trim()){
        yamlLint.lint(notes).then(function () {
            params.body = {
                version: req.body.version,
                description: req.body.description,
                notes: req.body.notes,
                period: req.body.period,
                author: req.body.author,
                period_units: req.body.period_units,
                api_command_sequence_id: req.body.api_command_sequence_id
            };
            return req.db.create(req , res , params);
        }).catch(function (error) {
            console.error('Invalid YAML file.', error);
            return req.db.sendError(error,res)
        });
    }else{
        req.db.sendError('YAML cannot be empty.' , res);
    }
}

function retrieve(req , res) {
    req.checkParams("id", "invalid api command sequence revision id").isInt();
    params.body = {where: {id: req.params.id}, include: ['api_command_sequence']};
    return req.db.retrieve(req , res , params);
}

function update(req,res) {
    req.checkBody("author", "Invalid sequence revision author").notEmpty();
    req.checkBody("version", "Invalid sequence revision version").notEmpty();
    req.checkBody("period", "Invalid sequence revision period").notEmpty();
    // req.checkBody("period_units", "Invalid sequence revision period units").notEmpty();
    // req.checkBody("notes", "Notes can't be empty or invalid yaml syntax").isYaml();
    req.checkBody("api_command_sequence_id", "invalid api_command_sequence_id").isInt();
    req.checkParams("id", "invalid api command sequence revision id").isInt();
    const notes = req.body.notes || null;
    if(notes && notes.trim()){
        yamlLint.lint(notes).then(function () {
            params.condition = {where: { id: req.params.id} };
            params.body = {
                version: req.body.version,
                description: req.body.description,
                notes: req.body.notes,
                period: req.body.period,
                author: req.body.author,
                period_units: req.body.period_units,
                api_command_sequence_id: req.body.api_command_sequence_id
            };
            return req.db.update(req , res , params);
        }).catch(function (error) {
            console.error('Invalid YAML file.', error);
            return req.db.sendError(error,res)
        });
    }else{
        req.db.sendError('YAML cannot be empty.' , res);
    }
}

function destroy(req , res) {
    req.checkParams("id", "invalid api command sequence revision id").isInt();
    params.condition = {where: {id: req.params.id}};
    return req.db.destroy(req , res , params);
}

module.exports = {
    list: list,
    retrieve: retrieve,
    destroy: destroy,
    update : update,
    create: create
};