'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductVersionUrlMm = sequelize.define("ProductVersionUrlMm", {
            product_version_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ProductVersion',
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
            tableName: 'product_version_url_mm'
        }
    );
    ProductVersionUrlMm.associate = function (models) {
        ProductVersionUrlMm.belongsTo(models.ProductVersion , { as: 'product_version' ,foreignKey: 'product_version_id' });
        ProductVersionUrlMm.belongsTo(models.Url , { as: 'url' ,foreignKey: 'url_id' });
    };
    return ProductVersionUrlMm;
};