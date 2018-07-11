'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiCommandSequence = sequelize.define("ApiCommandSequence", {
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
            firmware_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'FirmwareVersion',
                    key: 'id'
                }
            },
            product_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ProductVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_command_sequence'
        }
    );
    ApiCommandSequence.associate = function (models) {
        ApiCommandSequence.belongsTo(models.FirmwareVersion , { as: 'firmware_version' ,  foreignKey: 'firmware_version_id' });
        ApiCommandSequence.belongsTo(models.ProductVersion , { as: 'product_version' ,  foreignKey: 'product_version_id' });
        ApiCommandSequence.hasMany(models.ApiCommandSequenceRevision , { as: 'api_command_sequence_revisions' ,  foreignKey: 'api_command_sequence_id' });
    };
    return ApiCommandSequence;
};