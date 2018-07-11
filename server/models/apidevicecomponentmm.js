'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiDeviceComponentMm = sequelize.define("ApiDeviceComponentMm", {
            api_device_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'ApiDevice',
                    key: 'id'
                }
            },
            api_device_component_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'ApiDeviceComponent',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_device_component_mm'
        }
    );
    ApiDeviceComponentMm.associate = function (models) {
        ApiDeviceComponentMm.belongsTo(models.ApiDevice , { as: 'api_device' ,  foreignKey: 'api_device_id' });
        ApiDeviceComponentMm.belongsTo(models.ApiDeviceComponent , { as: 'api_device_component' ,  foreignKey: 'api_device_component_id' });

    };
    return ApiDeviceComponentMm;
};