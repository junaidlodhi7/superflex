'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_model_url_mm', {
            product_model_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product_model',
                    key: 'id'
                }
            },
            url_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'url',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('product_model_url_mm');
    }
};