'use strict';
const bcrypt     = require('bcrypt');
const salt       = bcrypt.genSaltSync(10);
var datetime = require('node-datetime');
var dt = datetime.create();
var pastDateTime = dt.format('m/d/Y H:M:S');
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('admin', [{
            first_name: "Jhon",
            last_name:  "Doe",
            role: 'admin',
            gender: "M",
            birth_date: '04-12-1992',
            email: 'admin@example.com',
            password: bcrypt.hashSync('password', salt, null),
            status: 'accepted',
            created_at: pastDateTime,
            updated_at: pastDateTime
        }], {});
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('admin', null, {});
    }
};