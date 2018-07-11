'use strict';
module.exports = function(sequelize, DataTypes) {
    const FirmwareVersionUrlMm = sequelize.define("FirmwareVersionUrlMm", {
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
            firmware_version_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'FirmwareVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'firmware_version_url_mm'
        }
    );
    FirmwareVersionUrlMm.associate = function (models) {
        FirmwareVersionUrlMm.belongsTo(models.FirmwareVersion , { as: 'firmware_version' ,  foreignKey: 'firmware_version_id' });
        FirmwareVersionUrlMm.belongsTo(models.Url , { as: 'url' ,  foreignKey: 'url_id' });
    };
    return FirmwareVersionUrlMm;
};