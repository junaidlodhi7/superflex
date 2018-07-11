'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('tag_annotation_mm', {
            tag_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'tag',
                    key: 'id'
                }
            },
            annotation_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'annotation',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('tag_annotation_mm');
    }
};