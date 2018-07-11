'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsComponentUrlMm = sequelize.define("SoftgoodsComponentUrlMm", {
            softgoods_component_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsComponent',
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
            tableName: 'softgoods_component_url_mm'
        }
    );
    SoftgoodsComponentUrlMm.associate = function (models) {
        SoftgoodsComponentUrlMm.belongsTo(models.SoftgoodsComponent , { as: 'softgoods_component' ,foreignKey: 'softgoods_component_id' });
        SoftgoodsComponentUrlMm.belongsTo(models.Url , { as: 'url' ,foreignKey: 'url_id' });
    };
    return SoftgoodsComponentUrlMm;
};