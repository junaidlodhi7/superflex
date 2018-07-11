const db   = require('../config/db');

var params = {tableName: 'ProductConfigRevision' , body: {}};

function list(req , res){
    params.body = { include: ['product_config']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        author: req.body.author,
        settings: req.body.settings,
        description: req.body.description,
        version: req.body.version,
        product_config_id: req.body.product_config_id

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
        author: req.body.author,
        settings: req.body.settings,
        description: req.body.description,
        version: req.body.version,
        product_config_id: req.body.product_config_id
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