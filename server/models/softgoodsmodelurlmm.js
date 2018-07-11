'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsModelUrlMm = sequelize.define("SoftgoodsModelUrlMm", {
            softgoods_model_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsModel',
                    key: 'id'
                }
            },
            url_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
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
            tableName: 'softgoods_model_url_mm'
        }
    );
    SoftgoodsModelUrlMm.associate = function (models) {
        SoftgoodsModelUrlMm.belongsTo(models.SoftgoodsModel , { as: 'softgoods_model' ,foreignKey: 'softgoods_model_id' });
        SoftgoodsModelUrlMm.belongsTo(models.Url , { as: 'url' ,foreignKey: 'url_id' });
    };
    return SoftgoodsModelUrlMm;
};