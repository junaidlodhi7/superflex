'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiDevice = sequelize.define("ApiDevice", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT
            },
            name: {
                type: DataTypes.STRING
            },
            nice_name: {
                type: DataTypes.STRING(512)
            },
            description: {
                type: DataTypes.STRING(1024)
            },
            notes: {
                type: DataTypes.TEXT
            },
            api_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            software_id: {
                type: DataTypes.INTEGER
            },
            is_master: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            is_default: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            hardware_component_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                onUpdate: 'CASCADE',
                references: {
                    model: 'HardwareComponent',
                    key: 'id'
                }
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_device'
        }
    );
    ApiDevice.associate = function (models) {
        ApiDevice.belongsTo(models.HardwareComponent , { as: 'hardware_component' ,foreignKey: 'hardware_component_id' });
    };
    return ApiDevice;
};