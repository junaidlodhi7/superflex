'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_version', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            version: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            notes: {
                type: Sequelize.TEXT
            },
            product_model_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product_model',
                    key: 'id'
                }
            },
            hardware_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'hardware_version',
                    key: 'id'
                }
            },
            softgoods_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'softgoods_version',
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

        return queryInterface.dropTable('product_version');
    }
};