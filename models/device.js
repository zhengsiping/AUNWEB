"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },  {
    classMethods: {
      associate: function(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Device.belongsTo(models.Workstation, {
          onDelete: "NO ACTION",
          foreignKey: {
            allowNull: true
          }
        });
        Device.belongsTo(models.DeviceType, {
          onDelete: 'No Action',
          foreignKey: {
            allowNull: false
          },
          as: 'type'
        });
        Device.hasOne(models.DeviceStatus, {
          onDelete: 'NO Action',
          foreignKey: {
            allowNull: true
          },
          as: 'status'
        });
      }
    }
  });

  return Device;
};