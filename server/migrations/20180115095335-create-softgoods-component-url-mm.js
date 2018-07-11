'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('softgoods_component_url_mm', {
            softgoods_component_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'softgoods_component',
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
        return queryInterface.dropTable('softgoods_component_url_mm');
    }
};