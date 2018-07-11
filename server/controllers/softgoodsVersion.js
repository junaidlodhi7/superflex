const db   = require('../config/db');

var params = {tableName: 'SoftgoodsVersion' , body: {}};

function list(req , res){
    params.body = { include: ['softgoods_model']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        version: req.body.version,
        softgoods_model_id: req.body.softgoods_model_id
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
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        version: req.body.version,
        softgoods_model_id: req.body.softgoods_model_id
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