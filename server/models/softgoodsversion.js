'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsVersion = sequelize.define("SoftgoodsVersion", {
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
                type: DataTypes.TEXT,
                allowNull: false
            },
            softgoods_model_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsModel',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'softgoods_version'
        }
    );
    SoftgoodsVersion.associate = function (models) {
        SoftgoodsVersion.belongsTo(models.SoftgoodsModel , { as: 'softgoods_model' ,foreignKey: 'softgoods_model_id' });

    };
    return SoftgoodsVersion;
};