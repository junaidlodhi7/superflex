'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_schema_url_mm', {
            api_schema_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'api_schema',
                    key: 'id'
                }
            },
            url_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'url',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('api_schema_url_mm');
    }
};