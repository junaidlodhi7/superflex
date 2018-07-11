'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_schema', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            firmware_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'firmware_version',
                    key: 'id'
                }
            },
            description: {
                type: Sequelize.STRING(1024)
            },
            notes: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('api_schema');
    }
};