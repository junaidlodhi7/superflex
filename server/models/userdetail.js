'use strict';
module.exports = function(sequelize, DataTypes) {
    const UserDetail = sequelize.define("UserDetail", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            date_of_birth: {
                allowNull: false,
                type: DataTypes.DATE
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "id"
                }
            },
            sex: {
                type:   DataTypes.STRING
                // values: ['Male' , 'Female'],
                // validate: {
                //     isIn: {
                //         args: [['Male','Female']],
                //         msg: "Invalid user sex."
                //     }
                // }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'user_detail'
        }
    );
    UserDetail.associate = function (models) {
        UserDetail.belongsTo(models.User , { as: 'user' ,  foreignKey: 'user_id' });
        UserDetail.hasMany(models.Weight , { as: 'weights' ,  foreignKey: 'user_detail_id' });
        UserDetail.hasMany(models.Height , { as: 'heights' ,  foreignKey: 'user_detail_id' });
    };
    return UserDetail;
};