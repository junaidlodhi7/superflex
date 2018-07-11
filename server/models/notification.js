'use strict';
module.exports = function(sequelize, DataTypes) {
    const Notification = sequelize.define("Notification", {
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
            category: {
                type: DataTypes.STRING(128)
            },
            level: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            data: {
                type: DataTypes.STRING(16384)
            },
            message: {
                type: DataTypes.STRING(128)
            },
            ts: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'notification'
        }
    );
    Notification.associate = function (models) {
        Notification.belongsTo(models.StorageSession , { as: 'storage_session' ,foreignKey: 'storage_session_id' });
    };
    return Notification;
};