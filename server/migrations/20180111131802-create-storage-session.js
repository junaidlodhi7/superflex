'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('storage_session', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            remote_id: {
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING(512),
                allowNull: false
            },
            location: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(4096)
            },
            connection_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            hardware_config: {
                type: Sequelize.STRING(16384)
            },
            ts_start: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            ts_end: {
                type: Sequelize.BIGINT
            },
            product_config_revision_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'product_config_revision',
                    key: 'id'
                }
            },
            product_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'user',
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
        return queryInterface.dropTable('storage_session');
    }
};