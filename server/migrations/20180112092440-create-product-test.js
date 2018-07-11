'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_test', {
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
            test_Type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            moderator: {
                type: Sequelize.STRING(512)
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
        return queryInterface.dropTable('product_test');
    }
};