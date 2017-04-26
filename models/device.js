"use strict";

module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    name: {
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
          foreignKey: 'workstationId',
          as: 'workstation'
        });
        Device.belongsTo(models.DeviceType, {
          onDelete: 'No Action',
          foreignKey: 'typeId',
          as: 'type'
        });
        Device.hasOne(models.DeviceStatus, {
          onDelete: 'NO Action',
          foreignKey: 'deviceId',
          as: 'status'
        });
      }
    }
  });

  return Device;
};