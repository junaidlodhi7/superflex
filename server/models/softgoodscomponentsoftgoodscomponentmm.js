'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsComponentSoftgoodsComponentMm = sequelize.define("SoftgoodsComponentSoftgoodsComponentMm", {
            softgoods_component_parent_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsComponent',
                    key: 'id'
                }
            },
            softgoods_component_child_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'SoftgoodsComponent',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'softgoods_component_softgoods_component_mm'
        }
    );
    SoftgoodsComponentSoftgoodsComponentMm.associate = function (models) {
        // SoftgoodsComponentSoftgoodsComponentMm.belongsTo(models.SoftgoodsComponent , { as: 'softgoods_component' ,foreignKey: 'softgoods_component_parent_id' });
        // SoftgoodsComponentSoftgoodsComponentMm.belongsTo(models.SoftgoodsComponent , { as: 'softgoods_component' ,foreignKey: 'softgoods_component_child_id' });
    };
    return SoftgoodsComponentSoftgoodsComponentMm;
};