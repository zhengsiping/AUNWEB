"use strict";

module.exports = function(sequelize, DataTypes) {
  var Province = sequelize.define('Province', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Province;
};