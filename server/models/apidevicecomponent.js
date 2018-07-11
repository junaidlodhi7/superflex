'use strict';
module.exports = function(sequelize, DataTypes) {
    const ApiDeviceComponent = sequelize.define("ApiDeviceComponent", {
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
            },
            component_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            api_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            software_id: {
                type: DataTypes.INTEGER
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue :true
            },
            hardware_component_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'HardwareComponent',
                    key: 'id'
                }
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'api_device_component'
        }
    );
    ApiDeviceComponent.associate = function (models) {
        ApiDeviceComponent.belongsTo(models.HardwareComponent , { as: 'hardware_component' ,  foreignKey: 'hardware_component_id' });
    };
    return ApiDeviceComponent;
};