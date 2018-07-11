'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiSchema = sequelize.define("ApiSchema", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            firmware_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'FirmwareVersion',
                    key: 'id'
                }
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            notes: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_schema'
        }
    );
    ApiSchema.associate = function (models) {
        ApiSchema.belongsTo(models.FirmwareVersion , { as: 'firmware_version' ,foreignKey: 'firmware_version_id' });
    };
    return ApiSchema;
};