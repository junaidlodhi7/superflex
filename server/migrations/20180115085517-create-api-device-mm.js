'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_device_mm', {
            api_schema_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'api_schema',
                    key: 'id'
                }
            },
            api_device_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'api_device',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('api_device_mm');
    }
};