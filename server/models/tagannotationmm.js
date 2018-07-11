'use strict';
module.exports = function(sequelize, DataTypes) {
    const TagAnnotationMm = sequelize.define("TagAnnotationMm", {
            tag_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Tag',
                    key: 'id'
                }
            },
            annotation_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Annotation',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'tag_annotation_mm'
        }
    );
    TagAnnotationMm.associate = function (models) {
        TagAnnotationMm.belongsTo(models.Tag , { as: 'tag' ,foreignKey: 'tag_id' });
        TagAnnotationMm.belongsTo(models.Annotation , { as: 'annotation' ,foreignKey: 'annotation_id' });
    };
    return TagAnnotationMm;
};