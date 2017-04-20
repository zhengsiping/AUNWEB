"use strict";

module.exports = function(sequelize, DataTypes) {
  var DeviceType = sequelize.define("DeviceType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return DeviceType;
};