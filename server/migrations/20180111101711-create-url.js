'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('url', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.TEXT
            },
            url: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.TEXT
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('url');
    }
};