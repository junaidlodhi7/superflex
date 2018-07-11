'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductVersion = sequelize.define("ProductVersion", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            version: {
                allowNull: false,
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT
            },
            notes: {
                type: DataTypes.TEXT
            },
            product_model_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ProductModel',
                    key: 'id'
                }
            },
            hardware_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'HardwareVersion',
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
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_version'
        }
    );
    ProductVersion.associate = function (models) {
        ProductVersion.belongsTo(models.ProductModel , { as: 'product_model' ,foreignKey: 'product_model_id' });
        ProductVersion.belongsTo(models.HardwareVersion , { as: 'hardware_version' ,foreignKey: 'hardware_version_id' });
        ProductVersion.belongsTo(models.SoftgoodsVersion , { as: 'softgoods_version' ,foreignKey: 'softgoods_version_id' });
        //
        ProductVersion.hasMany(models.Product , { as: 'products' ,foreignKey: 'product_version_id' });
        ProductVersion.hasMany(models.ProductConfig , { as: 'product_configs' ,foreignKey: 'product_version_id' });

    };
    return ProductVersion;
};