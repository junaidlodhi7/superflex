'use strict';
module.exports = function(sequelize, DataTypes) {
    const Weight = sequelize.define("Weight", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            weight: {
                allowNull: false,
                type: DataTypes.DOUBLE
            },
            user_detail_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: "UserDetail",
                    key: "id"
                }
            },
            is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
            units: {
                type:   DataTypes.DOUBLE,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'weight'
        }
    );
    Weight.associate = function (models) {
        Weight.belongsTo(models.UserDetail , { as: 'user_detail' ,  foreignKey: 'user_detail_id' });
    };
    return Weight;
};