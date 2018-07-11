'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_device', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            nice_name: {
                type: Sequelize.STRING(512)
            },
            description: {
                type: Sequelize.STRING(1024)
            },
            notes: {
                type: Sequelize.TEXT
            },
            api_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            software_id: {
                type: Sequelize.INTEGER
            },
            is_master: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            is_default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            hardware_component_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                onUpdate: 'CASCADE',
                references: {
                    model: 'hardware_component',
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
        return queryInterface.dropTable('api_device');
    }
};