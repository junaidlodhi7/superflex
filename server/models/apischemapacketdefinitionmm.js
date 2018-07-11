'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiSchemaPacketDefinitionMm = sequelize.define("ApiSchemaPacketDefinitionMm", {
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
            api_packet_definition_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'ApiPacketDefinition',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_schema_packet_definition_mm'
        }
    );
    ApiSchemaPacketDefinitionMm.associate = function (models) {
        ApiSchemaPacketDefinitionMm.belongsTo(models.ApiSchema , { as: 'api_schema' ,  foreignKey: 'api_schema_id' });
        ApiSchemaPacketDefinitionMm.belongsTo(models.ApiPacketDefinition , { as: 'api_packet_definition' ,  foreignKey: 'api_packet_definition_id' });

    };
    return ApiSchemaPacketDefinitionMm;
};