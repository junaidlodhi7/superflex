'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_config_revision', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            author: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            settings: {
                type: Sequelize.STRING(16384),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(1024)
            },
            version: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            product_config_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product_config',
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

        return queryInterface.dropTable('product_config_revision');
    }
};