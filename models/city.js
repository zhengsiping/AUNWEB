"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return City;
};