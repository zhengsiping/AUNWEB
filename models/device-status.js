"use strict";

module.exports = function(sequelize, DataTypes) {
  var DeviceStatus = sequelize.define('DeviceStatus', {
    lastOnlineTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastOfflineTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
  },  {
    classMethods: {
      associate: function(models) {
        DeviceStatus.belongsTo(models.DeviceStatusType, {
          onDelete: "NO ACTION",
          as: 'status'
        });
        DeviceStatus.belongsTo(models.Device, {
          onDelete: 'No Action',
          as: 'device'
        });
      }
    }
  });
  return DeviceStatus;
};