'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_command_sequence_unit', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            api_command_sequence_revision_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'api_command_sequence_revision',
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
        return queryInterface.dropTable('api_command_sequence_unit');
    }
};