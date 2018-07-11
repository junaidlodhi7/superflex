'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareComponentUrlMm = sequelize.define("HardwareComponentUrlMm", {
            url_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'Url',
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
            tableName: 'hardware_component_url_mm'
        }
    );
    HardwareComponentUrlMm.associate = function (models) {
        HardwareComponentUrlMm.belongsTo(models.HardwareComponent , { as: 'hardware_component' ,  foreignKey: 'hardware_component_id' });
        HardwareComponentUrlMm.belongsTo(models.Url , { as: 'url' ,  foreignKey: 'url_id' });
    };
    return HardwareComponentUrlMm;
};