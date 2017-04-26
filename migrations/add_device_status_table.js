"use strict";

module.exports = {
  up: function(queryInterface, Sequelize, done) {
    queryInterface.createTable(
      'device_statuses',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        lastOnlineTime: {
          type: Sequelize.DATE,
        },
        lastOfflineTime: {
          type: Sequelize.DATE,
        },
        statusId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        deviceId: {
          type: Sequelize.INTEGER,
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
    queryInterface.dropTable('device_statuses');
  }
};