'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsModel = sequelize.define("SoftgoodsModel", {
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
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'softgoods_model'
        }
    );
    SoftgoodsModel.associate = function (models) {
        SoftgoodsModel.hasMany(models.SoftgoodsVersion , { as: 'softgoods_versions' ,foreignKey: 'softgoods_model_id' });

    };
    return SoftgoodsModel;
};