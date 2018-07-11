const db   = require('../config/db');

var params = {tableName: 'Product' , body: {}};

function list(req , res){
    params.body = { include: ['product_version', 'firmware_version']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        serial_number: req.body.serial_number,
        product_version_id: req.body.product_version_id,
        build_date: req.body.build_date,
        firmware_version_id: req.body.firmware_version_id
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
        serial_number: req.body.serial_number,
        product_version_id: req.body.product_version_id,
        build_date: req.body.build_date,
        firmware_version_id: req.body.firmware_version_id
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