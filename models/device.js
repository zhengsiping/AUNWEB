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
            allowNull: false
          }
        });
        Device.belongsTo(models.DeviceType, {
          onDelete: 'No Action',
          foreignKey: {
            allowNull: false,
            as: 'type'
          }
        });
      }
    }
  });

  return Device;
};