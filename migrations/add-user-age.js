"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.addColumn(
      'users',
      'userAge',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    done();
  },

  down: function(queryInterface) {
    queryInterface.removeColumn('users', 'userAge')
  }
};