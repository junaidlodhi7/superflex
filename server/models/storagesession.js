'use strict';
module.exports = function(sequelize, DataTypes) {
    const StorageSession = sequelize.define("StorageSession", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            remote_id: {
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING(512),
                allowNull: false
            },
            location: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(4096)
            },
            connection_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hardware_config: {
                type: DataTypes.STRING(16384)
            },
            ts_start: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            ts_end: {
                type: DataTypes.BIGINT
            },
            product_config_revision_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'ProductConfigRevision',
                    key: 'id'
                }
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Product',
                    key: 'id'
                }
            },
            user_id: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'User',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'storage_session'
        }
    );
    StorageSession.associate = function (models) {
        StorageSession.belongsTo(models.Product , { as: 'product' ,foreignKey: 'product_id' });
        StorageSession.belongsTo(models.ProductConfigRevision , { as: 'product_config_revision' ,foreignKey: 'product_config_revision_id' });
        StorageSession.belongsTo(models.User , { as: 'user' ,foreignKey: 'user_id' });
        StorageSession.hasMany(models.Notification , { as: 'notifications' ,foreignKey: 'storage_session_id' });
        StorageSession.hasMany(models.Annotation , { as: 'annotations' ,foreignKey: 'storage_session_id' });
        StorageSession.hasMany(models.ProductData , { as: 'product_datas' ,foreignKey: 'storage_session_id' });
        StorageSession.hasMany(models.ProductTest , { as: 'product_tests' ,foreignKey: 'storage_session_id' });

    };
    return StorageSession;
};