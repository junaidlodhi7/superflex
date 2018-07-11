'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiDeviceMm = sequelize.define("ApiDeviceMm", {
            api_schema_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'ApiSchema',
                    key: 'id'
                }
            },
            api_device_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'ApiDevice',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_device_mm'
        }
    );
    ApiDeviceMm.associate = function (models) {
        ApiDeviceMm.belongsTo(models.ApiSchema , { as: 'api_schema' ,  foreignKey: 'api_schema_id' });
        ApiDeviceMm.belongsTo(models.ApiDevice , { as: 'api_device' ,  foreignKey: 'api_device_id' });

    };
    return ApiDeviceMm;
};