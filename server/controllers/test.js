const db         = require('../config/db');
const dateFormat = require('dateformat');
const async        = require('async');
const minutes30 = 1800000;

var params = {tableName: 'Test' , body: {}};

require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
const env     = 'production_old';
const config  = require(__dirname + '/../config/config.js')[env];
var db_pro        = {};
var sequelize_pro = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect});

sequelize_pro.authenticate().then(function(){
    console.log("Connection has been established successfully to Production 2 environment.");
}).catch(function(err) {
    console.log('Unable to connect to the ' + env + ' database:'+ JSON.stringify(err , null , 2));
});

db_pro.sequelize = sequelize_pro;
db_pro.Sequelize = sequelize_pro;

function create(req , res) {
    var start_time = Date.now();
    var end_time = start_time + req.body.duration
    db.models[params.tableName].create({
        label: req.body.label,
        test_date: req.body.test_date,
        suit_config_id:  req.body.suit_id,
        created_by_id:  req.user.id,
        field_notes: req.body.field_notes,
        test_type_id: req.body.test_type_id,
        start_time: start_time,
        end_time: end_time,
        data_intervals: [{
            start_timestamp: start_time,
            stop_timestamp: end_time
        }],user_tests: [{
            mobi_user_id: req.body.user_id
        }]

    }, {
        include: [{
            model: db.models['DataInterval'],
            as: 'data_intervals'
        }, {
            model: db.models['UserTest'],
            as: 'user_tests'
        }]
    }).then(function (test) {
        return res.status(200).send({success: true , data: test});
    }).catch(function(error){
        console.log(JSON.stringify(error , null ,2));
        db.sendError(error,res);
    });
}

function stop(req , res){
    params.condition = {where: { id: req.params.id} };
    params.body = {
        end_time: Date.now()
    };
    return db.update(req , res , params);
}

function extend(req , res){
    db.retrieve(req,res,params,function(test) {
        test.updateAttributes({end_time: test.end_time + minutes30}).then(function(result){
            return res.status(200).send({success: true , data: result});
        }).catch(function(error){
            console.log(JSON.stringify(error , null ,2));
            return db.sendError(error,res);
        });
    });
}

function searchParams(query)
{
     var includes = [];
     var where = {};
    if(query.q)
    {
        where = { 'label': {$iLike: '%'+query.q+'%'}};
    }
    if(query.suit) {
        const suit = query.suit;
        includes.push({
            model: db.models['SuitConfig'],
            as: 'suit_config',
            duplicating: false,
            where: {
                id: suit
            }
        })
    }else{
        includes.push({model: db.models['SuitConfig'], as: 'suit_config'})
    }
    if(query.user) {
        const user = query.user;
        includes.push({
            model: db.models['MobiUser'],
            as: 'users',
            duplicating: false,
            where: {
                id: user
            }
        })
    }else{
        includes.push({model: db.models['MobiUser'], as: 'users'})
    }

    if(query.type) {
        const type = query.type;
        includes.push({
            model: db.models['TestType'],
            as: 'test_type',
            duplicating: false,
            where: {
                id: type
            }
        });
    }else{
        includes.push({model: db.models['TestType'], as: 'test_type'})
    }
    return {where: where , includes: includes};
}

function list(req , res){
    if(req.query.q || req.query.suit || req.query.type || req.query.user)
    {
        const search = searchParams(req.query);
        params.body = {where: search.where , include: search.includes , distinct: 'id', order: [['created_timestamp', 'DESC']]};
    }else {
        params.body = {include: ['suit_config' , 'test_type'], distinct: 'id' ,order: [['created_timestamp', 'DESC']]};
    }
    return db.list(req , res , params);
}

function retrieve(req , res)
{
    params.body = {where: {id: req.params.id} , include: ['suit_annotations' , 'data_intervals','test_type' , 'suit_config' , 'users']};
    async.waterfall([
        function(done) {
            db.retrieve(req,res,params,function(test) {
                if(test.start_time){
                    done(null, test, test.start_time);
                }else{
                    var start_date = null;
                    db.models.sequelize.query("select (data->>'ts_max') as start_time FROM notification where notification.test_id = " + test.id + " and data->>'ts_max' is not null ORDER BY id LIMIT 1")
                        .then(function(result) {
                            start_date = parseInt(result[0][0]['start_time']);
                            test.updateAttributes({start_time: start_date}).then(function(result){
                                done(null, test, start_date);
                            }).catch(function(error){
                                console.log(JSON.stringify(error , null ,2));
                                done(null, test, null);
                            });
                        }).catch(function (err) {
                        done(null, test, start_date);
                    });
                }
            });

        },
        function(test, notificationStart , done) {
            if(test.end_time){
                done(null, test, notificationStart , test.end_time);
            }else{
                var end_date = null;
                db.models.sequelize.query("select (data->>'ts_max') as end_time FROM notification where notification.test_id = " + test.id + " and data->>'ts_max' is not null ORDER BY id desc LIMIT 1")
                    .then(function(result) {
                        end_date = parseInt(result[0][0]['end_time']);
                        test.updateAttributes({end_time: end_date}).then(function(result){
                            done(null , test , notificationStart , end_date);
                        }).catch(function(error){
                            console.log(JSON.stringify(error , null ,2));
                            done(null, test, notificationStart ,null);
                        });
                    }).catch(function (err) {
                    done(null, test, notificationStart, null);
                });
            }
        },
        function(test, notificationStart, notificationEnd , done) {
            return res.status(200).send({success: true , data: test});
        }
    ], function(err) {
        if (err)
            return db.sendError(err,res);
    });
}

function update(req , res)
{
    params.condition = {where: {id: req.params.id} };
    params.body = req.body;
    return db.update(req , res , params);
}

function motor_intervals(req , res){

    // req.checkBody('start', 'Invalid description').notEmpty();
    // req.checkBody('album_id', 'Invalid album_id').isNumeric();
    // var errors = req.validationErrors();
    // if (errors) {
    //     var response = { errors: [] };
    //     errors.forEach(function(err) {
    //         response.errors.push(err);
    //     });
    //     res.statusCode = 400;
    //     return res.json(response);
    // }else{
    // }

    var query = "select CAST( (data->>'ts_max')AS DOUBLE PRECISION) AS x , CAST(7.41 AS DOUBLE PRECISION) as y" +
        " from notification where id in (select id from notification ";
    // if(req.query.start && req.query.end && req.query.start < req.query.end)
    //     query += " where (data->>'ts_max')::bigint >= "+ req.query.start  + " and (data->>'ts_max')::bigint  < " + req.query.end;
    query += " Limit 2000) order by x asc;";

    db_pro.sequelize.query(query)
        .then(function(result) {
            return res.status(200).send({success: true, data: result[0]});
        }).catch(function (err) {
        return db.sendError(err,res);
    });

}

function graph(req , res) {
    var response = [];

    // async.waterfall([
    //     function(done) {
    //         params.body = {where: {id: req.params.id} , attributes:['id' , 'start_time' , 'end_time']};
    //         db.retrieve(req,res,params,function(test) {
    //
    //             if(test.start_time){
    //                 done(null, test, test.start_time);
    //             }else{
    //                 var start_date = null;
    //                 db.models.sequelize.query("select (data->>'ts_max') as start_time FROM notification where notification.test_id = " + test.id + " and data->>'ts_max' is not null ORDER BY id LIMIT 1")
    //                     .then(function(result) {
    //                         start_date = parseInt(result[0][0]['start_time']);
    //                         test.updateAttributes({start_time: start_date}).then(function(result){
    //                             done(null, test, start_date);
    //                         }).catch(function(error){
    //                             console.log(JSON.stringify(error , null ,2));
    //                             done(null, test, null);
    //                         });
    //                     }).catch(function (err) {
    //                     done(null, test, start_date);
    //                 });
    //             }
    //         });
    //     },
    //     function(test, notificationStart , done) {
    //         if(test.end_time){
    //             done(null, test, notificationStart , test.end_time);
    //         }else{
    //             var end_date = null;
    //             db.models.sequelize.query("select (data->>'ts_max') as end_time FROM notification where notification.test_id = " + test.id
    //                 + " and data->>'ts_max' is not null ORDER BY id desc LIMIT 1")
    //                 .then(function(result) {
    //                     end_date = parseInt(result[0][0]['end_time']);
    //                     test.updateAttributes({end_time: end_date}).then(function(result){
    //                         done(null , test , notificationStart , end_date);
    //                     }).catch(function(error){
    //                         console.log(JSON.stringify(error , null ,2));
    //                         done(null, test, notificationStart ,null);
    //                     });
    //                 }).catch(function (err) {
    //                 done(null, test, notificationStart, null);
    //             });
    //         }
    //     },
    //     function(test, notificationStart, notificationEnd , done) {
    //             db.response(req , res , test.getSuit_annotations({attributes:['label' , 'start_timestamp' , 'stop_timestamp' , 'created_timestamp'] ,  order: [['created_timestamp', 'DESC']]}) , function (suit_annotations) {
    //                 var date = new Date();
    //                 suit_annotations.forEach(function (element) {
    //                     var d1 = new Date(element.start_timestamp);
    //                     var d2 = new Date(element.stop_timestamp);
    //                     var st = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate() , d1.getHours(), d1.getMinutes() , d1.getSeconds() , d1.getMilliseconds());
    //                     var et = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes() , d2.getSeconds() , d2.getMilliseconds());
    //                     response.push({
    //                         x: 1,
    //                         low: st,
    //                         high: et,
    //                         name: element.label,
    //                         description: element.notes
    //                     })
    //                 });
    //                 return res.status(200).send({success: true , data: { start: notificationStart , end: notificationEnd ,points: response}});
    //             });
    //     }
    // ], function(err) {
    //     if (err)
    //         return db.sendError(err,res);
    // });


}

function destroy(req , res)
{
    params.condition = {where: {id: req.params.id}};
    return db.destroy(req , res , params);
}

module.exports = {
    list: list,
    retrieve: retrieve,
    update: update,
    graph: graph,
    motor_intervals: motor_intervals,
    destroy: destroy,
    create: create,
    stop: stop,
    extend: extend
};