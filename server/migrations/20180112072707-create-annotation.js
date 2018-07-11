'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('annotation', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING(512)
            },
            notes: {
                type: Sequelize.STRING(8192)
            },
            ts: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            ts_end: {
                type: Sequelize.BIGINT
            },
            author: {
                type: Sequelize.STRING(1024)
            },
            storage_session_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'storage_session',
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
        return queryInterface.dropTable('annotation');
    }
};