'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiCommandSequenceRevision = sequelize.define("ApiCommandSequenceRevision", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            notes: {
                type: DataTypes.TEXT
            },
            period: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            period_units: {
                type: DataTypes.DOUBLE
            },
            api_command_sequence_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ApiCommandSequence',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_command_sequence_revision'
        }
    );
    ApiCommandSequenceRevision.associate = function (models) {
        ApiCommandSequenceRevision.belongsTo(models.ApiCommandSequence , { as: 'api_command_sequence' ,  foreignKey: 'api_command_sequence_id' });
    };
    return ApiCommandSequenceRevision;
};