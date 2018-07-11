'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('softgoods_version_url_mm', {
            url_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'url',
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
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('softgoods_version_url_mm');
    }
};