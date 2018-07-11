'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('hardware_component_hardware_component_mm', {
            hardware_component_parent_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'hardware_component',
                    key: 'id'
                }
            },
            hardware_component_child_id: {
                type: Sequelize.BIGINT,
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

        return queryInterface.dropTable('hardware_component_hardware_component_mm');
    }
};