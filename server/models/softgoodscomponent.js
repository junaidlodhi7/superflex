'use strict';
module.exports = function(sequelize, DataTypes) {
    const SoftgoodsComponent = sequelize.define("SoftgoodsComponent", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING(256)
            },
            nice_name: {
                type: DataTypes.STRING(512)
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            notes: {
                type: DataTypes.TEXT
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'softgoods_component'
        }
    );
    SoftgoodsComponent.associate = function (models) {};
    return SoftgoodsComponent;
};