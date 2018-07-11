'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('hardware_version_component_mm', {
            hardware_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'hardware_version',
                    key: 'id'
                }
            },
            hardware_component_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'hardware_component',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {

        return queryInterface.dropTable('hardware_version_component_mm');
    }
};