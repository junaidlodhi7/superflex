const db   = require('../config/db');

var params = {tableName: 'ProductConfig' , body: {}};

function list(req , res){
    params.body = { include: ['firmware_version', 'product_version']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        firmware_version_id: req.body.firmware_version_id,
        product_version_id: req.body.product_version_id


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
        firmware_version_id: req.body.firmware_version_id,
        product_version_id: req.body.product_version_id
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