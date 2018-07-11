'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('firmware_version', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.TEXT
            },
            nice_name: {
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            notes: {
                type: Sequelize.TEXT
            },
            version: {
                allowNull: false,
                type: Sequelize.STRING
            },
            hardware_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'hardware_version',
                    key: 'id'
                }
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

        return queryInterface.dropTable('firmware_version');
    }
};