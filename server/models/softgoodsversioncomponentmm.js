'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsVersionComponentMm = sequelize.define("SoftgoodsVersionComponentMm", {
            softgoods_component_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsComponent',
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
            tableName: 'softgoods_version_component_mm'
        }
    );
    SoftgoodsVersionComponentMm.associate = function (models) {
        SoftgoodsVersionComponentMm.belongsTo(models.SoftgoodsComponent , { as: 'softgoods_component' ,foreignKey: 'softgoods_component_id' });
        SoftgoodsVersionComponentMm.belongsTo(models.SoftgoodsVersion , { as: 'softgoods_version' ,foreignKey: 'softgoods_version_id' });
    };
    return SoftgoodsVersionComponentMm;
};