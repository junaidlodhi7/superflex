'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('hardware_version', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: 'hardware_version_unique'
            },
            nice_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            notes: {
                type: Sequelize.TEXT
            },
            version: {
                type: Sequelize.STRING,
                unique: 'hardware_version_unique',
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('hardware_version');
    }
};