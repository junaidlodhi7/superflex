'use strict';
module.exports = function(sequelize, DataTypes) {
    const Annotation = sequelize.define("Annotation", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING(512)
            },
            notes: {
                type: DataTypes.STRING(8192)
            },
            ts: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            ts_end: {
                type: DataTypes.BIGINT
            },
            author: {
                type: DataTypes.STRING(1024)
            },
            storage_session_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'StorageSession',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'annotation'
        }
    );
    Annotation.associate = function (models) {
        Annotation.belongsTo(models.StorageSession , { as: 'storage_session' ,foreignKey: 'storage_session_id' });
        Annotation.hasMany(models.TagAnnotationMm , { as: 'tag_annotation_mms' ,foreignKey: 'annotation_id' });

    };
    return Annotation;
};