'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiSchemaUrlMm = sequelize.define("ApiSchemaUrlMm", {
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
            url_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Url',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_schema_url_mm'
        }
    );
    ApiSchemaUrlMm.associate = function (models) {
        ApiSchemaUrlMm.belongsTo(models.ApiSchema , { as: 'api_schema' ,  foreignKey: 'api_schema_id' });
        ApiSchemaUrlMm.belongsTo(models.Url , { as: 'url' ,  foreignKey: 'url_id' });

    };
    return ApiSchemaUrlMm;
};