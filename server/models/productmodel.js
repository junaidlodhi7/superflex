'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductModel = sequelize.define("ProductModel", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.TEXT
            },
            nice_name: {
                type: DataTypes.TEXT
            },
            description: {
                type: DataTypes.TEXT
            },
            notes: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_model'
        }
    );
    ProductModel.associate = function (models) {
        ProductModel.hasMany(models.ProductVersion , { as: 'product_versions' ,foreignKey: 'product_model_id' });
        // ProductModel.hasMany(models.ProductModelUrlMm , { as: 'product_model_url_mms' ,foreignKey: 'product_model_id' });
    };
    return ProductModel;
};