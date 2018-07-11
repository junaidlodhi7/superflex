'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiPacketDefinition = sequelize.define("ApiPacketDefinition", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING(256)
            },
            nice_name: {
                type: DataTypes.STRING(512)
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            notes: {
                type: DataTypes.TEXT
            },
            packet_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            packet_category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            api_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            data_sequence: {
                type: DataTypes.STRING(128)
            },
            labels: {
                type: DataTypes.STRING(512)
            },
            bitmap_labels: {
                type: DataTypes.STRING(16384)
            },
            units: {
                type: DataTypes.STRING(16384)
            },
            configuration: {
                type: DataTypes.STRING(16384)
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_packet_definition'
        }
    );
    ApiPacketDefinition.associate = function (models) {};
    return ApiPacketDefinition;
};