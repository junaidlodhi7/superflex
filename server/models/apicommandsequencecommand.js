'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiCommandSequenceCommand = sequelize.define("ApiCommandSequenceCommand", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue :0
            },
            key: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            value: {
                type: DataTypes.STRING(16384)
            },
            api_command_sequence_unit_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ApiCommandSequenceUnit',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_command_sequence_command'
        }
    );
    ApiCommandSequenceCommand.associate = function (models) {
        ApiCommandSequenceCommand.belongsTo(models.ApiCommandSequenceUnit , { as: 'api_command_sequence_unit' ,  foreignKey: 'api_command_sequence_unit_id' });
    };
    return ApiCommandSequenceCommand;
};