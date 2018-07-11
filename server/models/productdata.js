'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductData = sequelize.define("ProductData", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            storage_session_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'StorageSession',
                    key: 'id'
                }
            },
            ts: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING(128)
            },
            labels: {
                type: DataTypes.STRING(16384)
            },
            data: {
                type: DataTypes.STRING(16384)
            },
            group: {
                type: DataTypes.STRING(16384)
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_data'
        }
    );
    ProductData.associate = function (models) {
        ProductData.belongsTo(models.StorageSession , { as: 'storage_session' ,foreignKey: 'storage_session_id' });
    };
    return ProductData;
};