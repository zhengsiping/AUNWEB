"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.changeColumn(
      'employees',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    done();
  },
  down: function(queryInterface) {
    queryInterface.changeColumn(
      'employees',
      'name',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  }
};