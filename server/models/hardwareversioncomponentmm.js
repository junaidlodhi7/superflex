'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareVersionComponentMm = sequelize.define("HardwareVersionComponentMm", {
            hardware_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'HardwareVersion',
                    key: 'id'
                }
            },
            hardware_component_id: {
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
            tableName: 'hardware_version_component_mm'
        }
    );
    HardwareVersionComponentMm.associate = function (models) {
        HardwareVersionComponentMm.belongsTo(models.HardwareComponent , { as: 'hardware_component' ,  foreignKey: 'hardware_component_id' });
        HardwareVersionComponentMm.belongsTo(models.HardwareVersion , { as: 'hardware_version' ,  foreignKey: 'hardware_id' });

    };
    return HardwareVersionComponentMm;
};