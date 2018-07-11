const db   = require('../config/db');

var params = {tableName: 'StorageSession' , body: {}};

function list(req , res){
    params.body = { include: ['product_config_revision', 'product', 'user']};
    params.pagination = req.query.pagination;
    return db.list(req , res , params);
}

function create(req, res) {

    req.checkBody('remote_id', 'Invalid remoteID').notEmpty();
    req.checkBody('user_id', 'Invalid user_id').notEmpty();
    params.body = {
        remote_id: req.body.remote_id,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        connection_type: req.body.connection_type,
        hardware_config: req.body.hardware_config,
        ts_start: req.body.ts_start,
        ts_end: req.body.ts_end,
        product_config_revision_id: req.body.product_config_revision_id,
        product_id: req.body.product_id,
        user_id: req.body.user_id

    };
    return db.create(req , res , params);
}

function retrieve(req , res)
{
    params.body = {where: {id: req.params.id}, include: [
        {
            model: db.models.ProductConfigRevision ,
            as: 'product_config_revision',
            include: [{
                model: db.models.ProductConfig ,
                as: 'product_config'
                // include: [
                //     {
                //         model: db.models.FirmwareVersion ,
                //         as: 'firmware_version',
                //         include: [{
                //             model: db.models.HardwareVersion ,
                //             as: 'hardware_version'
                //         }]
                //     },
                //     {
                //         model: db.models.ProductVersion ,
                //         as: 'product_version',
                //         include: [{
                //             model: db.models.ProductModel ,
                //             as: 'product_model'
                //             },
                //             {
                //                 model: db.models.HardwareVersion ,
                //                 as: 'hardware_version'
                //             },{
                //                 model: db.models.SoftgoodsVersion ,
                //                 as: 'softgoods_version'
                //             }
                //         ]
                //     }
                // ]
            }]
        } , {
            model: db.models.Product,
            as : 'product',
            include: [
                {
                    model: db.models.ProductVersion,
                    as: 'product_version'
                },
                {
                    model: db.models.FirmwareVersion,
                    as: 'firmware_version'
                }
            ]
        }, 'user'] };
    return db.retrieve(req , res , params);
}

function update(req,res) {

    params.condition = {where: { id: req.params.id} };
    params.body = {
        remote_id: req.body.remote_id,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        connection_type: req.body.connection_type,
        hardware_config: req.body.hardware_config,
        ts_start: req.body.ts_start,
        ts_end: req.body.ts_end,
        product_config_revision_id: req.body.product_config_revision_id,
        product_id: req.body.product_id,
        user_id: req.body.user_id
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