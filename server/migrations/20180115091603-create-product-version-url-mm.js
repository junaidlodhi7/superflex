'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product_version_url_mm', {
            product_version_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'product_version',
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
        return queryInterface.dropTable('product_version_url_mm');
    }
};