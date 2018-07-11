const db   = require('../config/db');

var params = {tableName: 'HardwareComponent' , body: {}};

function list(req , res){
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {
    params.body = {
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        part_number: req.body.part_number,
        manufacturer: req.body.manufacturer,
        dimensions: req.body.dimensions,
        weight: req.body.weight
    };
    return db.create(req , res , params);
}

function update(req,res) {

    params.condition = {where: { id: req.params.id} };
    params.body = {
        name: req.body.name,
        nice_name: req.body.nice_name,
        description: req.body.description,
        notes: req.body.notes,
        part_number: req.body.part_number,
        manufacturer: req.body.manufacturer,
        dimensions: req.body.dimensions,
        weight: req.body.weight
    };
    return db.update(req , res , params);
}


function retrieve(req , res)
{
    params.body = {where: {id: req.params.id}};
    return db.retrieve(req , res , params);
}

function destroy(req , res)
{
    params.condition = {where: { id: req.params.id} };
    return db.destroy(req , res , params);
}

module.exports = {
    list: list,
    create: create,
    update:update,
    retrieve: retrieve,
    destroy: destroy
};