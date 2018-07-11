'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('notification', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            storage_session_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'storage_session',
                    key: 'id'
                }
            },
            category: {
                type: Sequelize.STRING(128)
            },
            level: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            data: {
                type: Sequelize.STRING(16384)
            },
            message: {
                type: Sequelize.STRING(128)
            },
            ts: {
                type: Sequelize.BIGINT,
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
        return queryInterface.dropTable('notification');
    }
};