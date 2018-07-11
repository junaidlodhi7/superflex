'use strict';
module.exports = function(sequelize, DataTypes) {
    const FirmwareVersion = sequelize.define("FirmwareVersion", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.TEXT
            },
            nice_name: {
                type: DataTypes.TEXT
            },
            description: {
                type: DataTypes.TEXT
            },
            notes: {
                type: DataTypes.TEXT
            },
            version: {
                allowNull: false,
                type: DataTypes.STRING
            },
            hardware_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'HardwareVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'firmware_version'
        }
    );
    FirmwareVersion.associate = function (models) {
        FirmwareVersion.belongsTo(models.HardwareVersion , { as: 'hardware_version' ,foreignKey: 'hardware_version_id' });
        FirmwareVersion.hasMany(models.Product , { as: 'products' ,foreignKey: 'firmware_version_id' });
        FirmwareVersion.hasMany(models.ProductConfig , { as: 'product_configs' ,foreignKey: 'firmware_version_id' });
        FirmwareVersion.hasMany(models.ApiCommandSequence , { as: 'api_command_sequences' ,  foreignKey: 'firmware_version_id' });

    };
    return FirmwareVersion;
};