'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductConfigRevision = sequelize.define("ProductConfigRevision", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            author: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            settings: {
                type: DataTypes.STRING(16384),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            product_config_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'ProductConfig',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_config_revision'
        }
    );
    ProductConfigRevision.associate = function (models) {
        ProductConfigRevision.belongsTo(models.ProductConfig , { as: 'product_config' ,foreignKey: 'product_config_id' });
        ProductConfigRevision.hasMany(models.StorageSession , { as: 'storage_sessions' ,foreignKey: 'product_config_revision_id' });
    };
    return ProductConfigRevision;
};