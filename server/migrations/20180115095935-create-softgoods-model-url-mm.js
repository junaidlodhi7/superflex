'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('softgoods_model_url_mm', {
            softgoods_model_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'softgoods_model',
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
        return queryInterface.dropTable('softgoods_model_url_mm');
    }
};