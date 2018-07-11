'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_command_sequence', {
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
            firmware_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'firmware_version',
                    key: 'id'
                }
            },
            product_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product_version',
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
        return queryInterface.dropTable('api_command_sequence');
    }
};