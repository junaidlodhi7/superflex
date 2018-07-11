'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareComponentHardwareComponentMm = sequelize.define("HardwareComponentHardwareComponentMm", {
            hardware_component_parent_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'HardwareComponent',
                    key: 'id'
                }
            },
            hardware_component_child_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'HardwareComponent',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'hardware_component_hardware_component_mm'
        }
    );
    HardwareComponentHardwareComponentMm.associate = function (models) {
        HardwareComponentHardwareComponentMm.belongsTo(models.HardwareComponent , { as: 'hardware_component_parent' ,  foreignKey: 'hardware_component_parent_id' });
        HardwareComponentHardwareComponentMm.belongsTo(models.HardwareComponent , { as: 'hardware_component_child' ,  foreignKey: 'hardware_component_child_id' });
    };
    return HardwareComponentHardwareComponentMm;
};