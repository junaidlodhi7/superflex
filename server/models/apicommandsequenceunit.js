'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiCommandSequenceUnit = sequelize.define("ApiCommandSequenceUnit", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            api_command_sequence_revision_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ApiCommandSequenceRevision',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_command_sequence_unit'
        }
    );
    ApiCommandSequenceUnit.associate = function (models) {
        ApiCommandSequenceUnit.belongsTo(models.ApiCommandSequenceRevision , { as: 'api_command_sequence_revision' ,  foreignKey: 'api_command_sequence_revision_id' });
    };
    return ApiCommandSequenceUnit;
};