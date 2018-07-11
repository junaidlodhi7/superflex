'use strict';
module.exports = function(sequelize, DataTypes) {
    const HardwareVersionUrlMm = sequelize.define("HardwareVersionUrlMm", {
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
            hardware_version_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'HardwareVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'hardware_version_url_mm'
        }
    );
    HardwareVersionUrlMm.associate = function (models) {
        HardwareVersionUrlMm.belongsTo(models.HardwareVersion , { as: 'hardware_version' ,  foreignKey: 'hardware_version_id' });
        HardwareVersionUrlMm.belongsTo(models.Url , { as: 'url' ,  foreignKey: 'url_id' });
    };
    return HardwareVersionUrlMm;
};