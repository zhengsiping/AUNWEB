"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'provinces',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    );
    done();
  },
  down: function(queryInterface) {
    queryInterface.dropTable('provinces');
  }
};