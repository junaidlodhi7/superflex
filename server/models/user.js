'use strict';
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            remote_id: {
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                },
                unique: true
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'user'
        }
    );
    User.beforeSave(function(user, options) {
        user.email = user.email.toLowerCase();
        console.log(user.email);
    });
    User.associate = function (models) {
        User.hasOne(models.UserDetail , { as: 'user_detail' ,  foreignKey: 'user_id' });
        User.hasMany(models.StorageSession , { as: 'storage_sessions' ,  foreignKey: 'user_id' });
    };
    return User;
};