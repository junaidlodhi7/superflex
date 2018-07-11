'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            serial_number: {
                allowNull: false,
                type: Sequelize.STRING
            },
            product_version_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'product_version',
                    key: 'id'
                }
            },
            build_date:{
                allowNull: false,
                type: Sequelize.DATE
            },
            firmware_version_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'firmware_version',
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

        return queryInterface.dropTable('product');
    }
};