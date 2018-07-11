'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_command_sequence_revision', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            version: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(1024)
            },
            notes: {
                type: Sequelize.TEXT
            },
            period: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            author: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            period_units: {
                type: Sequelize.DOUBLE
            },
            api_command_sequence_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'api_command_sequence',
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
        return queryInterface.dropTable('api_command_sequence_revision');
    }
};