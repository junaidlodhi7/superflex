'use strict';
module.exports = function(sequelize, DataTypes) {
    const Url = sequelize.define("Url", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'url'
        }
    );
    Url.associate = function (models) {
        Url.hasMany(models.HardwareComponentUrlMm , { as: 'hardware_component_url_mms' ,foreignKey: 'url_id' });
        Url.hasMany(models.HardwareVersionUrlMm , { as: 'hardware_version_url_mms' ,foreignKey: 'url_id' });
        Url.hasMany(models.ProductModelUrlMm , { as: 'product_model_url_mms' ,foreignKey: 'url_id' });

    };
    return Url;
};