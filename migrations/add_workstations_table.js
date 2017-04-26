"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'workstations',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cityId: {
          type: Sequelize.INTEGER
        },
        provinceId: {
          type: Sequelize.INTEGER
        },
        address: {
          type: Sequelize.STRING
        },
        administratorId: {
          type: Sequelize.INTEGER
        },
        phone: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        note: {
          type: Sequelize.STRING(2000)
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
    queryInterface.dropTable('workstations');
  }
};