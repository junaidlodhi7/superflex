const db   = require('../config/db');

var params = {tableName: 'ProductVersion' , body: {}};

function list(req , res){
    params.body = { include: ['product_model', 'hardware_version', 'softgoods_version']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        version: req.body.version,
        description: req.body.description,
        notes: req.body.notes,
        product_model_id: req.body.product_model_id,
        hardware_version_id: req.body.hardware_version_id,
        softgoods_version_id: req.body.softgoods_version_id

    };
    return db.create(req , res , params);
}

function retrieve(req , res)
{
    params.body = {where: {id: req.params.id}};
    return db.retrieve(req , res , params);
}

function update(req,res) {

    params.condition = {where: { id: req.params.id} };
    params.body = {
        version: req.body.version,
        description: req.body.description,
        notes: req.body.notes,
        product_model_id: req.body.product_model_id,
        hardware_version_id: req.body.hardware_version_id,
        softgoods_version_id: req.body.softgoods_version_id
    };
    return db.update(req , res , params);
}

function destroy(req , res) {
    params.condition = {where: {id: req.params.id}};
    return db.destroy(req , res , params);
}

module.exports = {
    list: list,
    retrieve: retrieve,
    destroy: destroy,
    update : update,
    create: create
};