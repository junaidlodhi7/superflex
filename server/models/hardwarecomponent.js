'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareComponent = sequelize.define("HardwareComponent", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
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
            part_number: {
                type: DataTypes.STRING(1024)
            },
            manufacturer: {
                type: DataTypes.STRING(1024)
            },
            dimensions: {
                type: DataTypes.STRING(1024)
            },
            weight: {
                type: DataTypes.STRING(1024)
            }
        },
        {
            indexes: [ { unique: true, fields: [ 'part_number' , 'manufacturer' , 'nice_name'] } ],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'hardware_component'
        }
    );
    HardwareComponent.associate = function (models) {
        // HardwareComponent.hasMany(models.ApiDevice , { as: 'api_devices' ,foreignKey: 'hardware_component_id' });
        // HardwareComponent.hasMany(models.HardwareComponentUrlMm , { as: 'hardware_component_url_mms' ,foreignKey: 'hardware_component_id' });
        // HardwareComponent.hasMany(models.HardwareVersionComponentUrlMm , { as: 'hardware_version_component_url_mms' ,foreignKey: 'hardware_component_id' });
    };
    return HardwareComponent;
};