'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_data', {
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
            ts: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            category: {
                type: Sequelize.STRING(128)
            },
            labels: {
                type: Sequelize.STRING(16384)
            },
            data: {
                type: Sequelize.STRING(16384)
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
        return queryInterface.dropTable('product_data');
    }
};