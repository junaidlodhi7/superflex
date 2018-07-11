'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('softgoods_version', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.TEXT
            },
            nice_name: {
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            notes: {
                type: Sequelize.TEXT
            },
            version: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            softgoods_model_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'softgoods_model',
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

        return queryInterface.dropTable('softgoods_version');
    }
};