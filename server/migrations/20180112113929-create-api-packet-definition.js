'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('api_packet_definition', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING(256)
            },
            nice_name: {
                type: Sequelize.STRING(512)
            },
            description: {
                type: Sequelize.STRING(1024)
            },
            notes: {
                type: Sequelize.TEXT
            },
            packet_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            packet_category: {
                type: Sequelize.STRING,
                allowNull: false
            },
            api_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            data_sequence: {
                type: Sequelize.STRING(128)
            },
            labels: {
                type: Sequelize.STRING(512)
            },
            bitmap_labels: {
                type: Sequelize.STRING(16384)
            },
            units: {
                type: Sequelize.STRING(16384)
            },
            configuration: {
                type: Sequelize.STRING(16384)
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
        return queryInterface.dropTable('api_packet_definition');
    }
};