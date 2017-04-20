"use strict";

module.exports = function(sequelize, DataTypes) {
  var Workstation = sequelize.define("Workstation", {
    stationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    province: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Workstation.belongsTo(models.Employee, {
          onDelete: "NO ACTION",
          foreignKey: {
            allowNull: true
          },
          as: 'administrator'
        });
      }
    }
  });

  return Workstation;
};