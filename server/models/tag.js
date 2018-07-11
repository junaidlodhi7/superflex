'use strict';
module.exports = function(sequelize, DataTypes) {
    const Tag = sequelize.define("Tag", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'tag'
        }
    );
    Tag.associate = function (models) {
        Tag.hasMany(models.TagAnnotationMm , { as: 'tag_annotation_mms' ,foreignKey: 'tag_id' });
    };
    return Tag;
};