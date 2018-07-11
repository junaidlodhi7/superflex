'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsVersionUrlMm = sequelize.define("SoftgoodsVersionUrlMm", {
            url_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Url',
                    key: 'id'
                }
            },
            softgoods_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'softgoods_version_url_mm'
        }
    );
    SoftgoodsVersionUrlMm.associate = function (models) {
        SoftgoodsVersionUrlMm.belongsTo(models.Url , { as: 'url' ,foreignKey: 'url_id' });
        SoftgoodsVersionUrlMm.belongsTo(models.SoftgoodsVersion , { as: 'softgoods_version' ,foreignKey: 'softgoods_version_id' });
    };
    return SoftgoodsVersionUrlMm;
};