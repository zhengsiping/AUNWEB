"use strict";

module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    openId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER
    }
  });

  return Customer;
};