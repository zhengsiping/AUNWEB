"use strict";

module.exports = function(sequelize, DataTypes) {
  var Workstation = sequelize.define("Workstation", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.STRING(2000)
    }
  }, {
    classMethods: {
      associate: function(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Workstation.belongsTo(models.Employee, {
          onDelete: "NO ACTION",
          foreignKey: 'administratorId',
          as: 'administrator'
        });
        Workstation.belongsTo(models.City, {
          onDelete: 'No Action',
          foreignKey: 'cityId',
          as: 'city'
        });
        Workstation.belongsTo(models.Province, {
          onDelete: 'No Action',
          foreignKey: 'provinceId',
          as: 'province'
        });
      }
    }
  });

  return Workstation;
};