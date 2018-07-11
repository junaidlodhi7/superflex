'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('hardware_version_url_mm', {
            url_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'url',
                    key: 'id'
                }
            },
            hardware_version_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'hardware_version',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('hardware_version_url_mm');
    }
};