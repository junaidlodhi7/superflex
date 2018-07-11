'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_device_component', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING(256)
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
            component_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            api_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            software_id: {
                type: Sequelize.INTEGER
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue :true
            },
            hardware_component_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
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
        return queryInterface.dropTable('api_device_component');
    }
};