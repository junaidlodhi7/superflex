'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareVersion = sequelize.define("HardwareVersion", {
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
            version: {
                type: DataTypes.STRING(64),
                allowNull: false
            }
        },
        {
            indexes: [ { unique: true, fields: [ 'name' , 'version'] } ],
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'hardware_version'
        }
    );
    HardwareVersion.associate = function (models) {
        // HardwareVersion.hasMany(models.FirmwareVersion , { as: 'firmware_versions' ,foreignKey: 'hardware_version_id' });
        // HardwareVersion.hasMany(models.ProductVersion , { as: 'product_versions' ,foreignKey: 'hardware_version_id' });
        // HardwareVersion.hasMany(models.HardwareVersionComponentUrlMm , { as: 'hardware_version_component_url_mms' ,foreignKey: 'hardware_version_id' });
    };
    return HardwareVersion;
};