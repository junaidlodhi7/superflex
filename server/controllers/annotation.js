const db   = require('../config/db');

var params = {tableName: 'Annotation' , body: {}};

function list(req , res){
    params.body = { include: ['storage_session']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        name: req.body.name,
        notes: req.body.notes,
        ts: req.body.ts,
        ts_end: req.body.ts_end,
        author: req.body.author,
        storage_session_id: req.body.storage_session_id
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
        notes: req.body.notes,
        ts: req.body.ts,
        ts_end: req.body.ts_end,
        author: req.body.author,
        storage_session_id: req.body.storage_session_id
    };
    return db.update(req , res , params);
}

function destroy(req , res) {
    params.condition = {where: {id: req.params.id}};
    return db.destroy(req , res , params);
}

module.exports = {
    list: list,
    create: create,
    retrieve: retrieve,
    destroy: destroy,
    update : update
};