"use strict";

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    qq: {
      type: DataTypes.INTEGER
    },
    note: {
      type: DataTypes.STRING(1000)
    },
    password: {
      type: DataTypes.STRING
    }
  });

  return Employee;
};