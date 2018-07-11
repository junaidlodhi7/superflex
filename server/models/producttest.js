'use strict';
module.exports = function(sequelize, DataTypes) {
    const ProductTest = sequelize.define("ProductTest", {
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
            test_Type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            moderator: {
                type: DataTypes.STRING(512)
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'product_test'
        }
    );
    ProductTest.associate = function (models) {
        ProductTest.belongsTo(models.StorageSession , { as: 'storage_session' ,foreignKey: 'storage_session_id' });
    };
    return ProductTest;
};