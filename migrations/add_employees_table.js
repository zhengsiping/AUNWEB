"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'employees',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          unique: true
        },
        name: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        qq: {
          type: Sequelize.INTEGER
        },
        note: {
          type: Sequelize.STRING(1000)
        },
        password: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    );
    done();
  },
  down: function(queryInterface) {
    queryInterface.dropTable('employees');
  }
};