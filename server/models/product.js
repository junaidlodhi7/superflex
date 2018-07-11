'use strict';
module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            serial_number: {
                allowNull: false,
                type: DataTypes.STRING
            },
            product_version_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ProductVersion',
                    key: 'id'
                }
            },
            build_date:{
                allowNull: false,
                type: DataTypes.DATE
            },
            firmware_version_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'FirmwareVersion',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'product'
        }
    );
    Product.associate = function (models) {
        Product.hasMany(models.StorageSession , { as: 'storage_sessions' ,  foreignKey: 'product_id' });
        Product.belongsTo(models.FirmwareVersion , { as: 'firmware_version' ,  foreignKey: 'firmware_version_id' });
        Product.belongsTo(models.ProductVersion , { as: 'product_version' ,  foreignKey: 'product_version_id' });
    };
    return Product;
};