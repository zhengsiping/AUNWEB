"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'devices',
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
        workstationId: {
          type: Sequelize.INTEGER
        },
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false
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
    queryInterface.dropTable('devices');
  }
};