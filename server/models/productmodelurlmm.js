'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductModelUrlMm = sequelize.define("ProductModelUrlMm", {
            product_model_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ProductModel',
                    key: 'id'
                }
            },
            url_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Url',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_model_url_mm'
        }
    );
    ProductModelUrlMm.associate = function (models) {
        ProductModelUrlMm.belongsTo(models.ProductModel , { as: 'product_model' ,foreignKey: 'product_model_id' });
        ProductModelUrlMm.belongsTo(models.Url , { as: 'url' ,foreignKey: 'url_id' });
    };
    return ProductModelUrlMm;
};