"use strict";

module.exports = function(sequelize, DataTypes) {
  var DeviceStatusType = sequelize.define('DeviceStatusType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return DeviceStatusType;
};