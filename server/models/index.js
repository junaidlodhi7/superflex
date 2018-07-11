'use strict';
require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
const env     = process.env.NODE_ENV || 'development';
const config  = require(__dirname + '/../config/config.js')[env];
var db        = {};
var sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect});

// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable]);
//
// } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

sequelize.authenticate().then(function(){
    console.log("Connection has been established successfully to " + env + " environment.");
}).catch(function(err) {
    console.log('Unable to connect to the ' + env + ' database:'+ JSON.stringify(err , null , 2));
});

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;