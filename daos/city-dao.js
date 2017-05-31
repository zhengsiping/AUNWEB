"use strict";
const BaseDAO = require('./base-dao');
class CityDAO extends BaseDAO{
  findById(id, callBack) {
    const sql = `SELECT *
                 FROM cities`;
    this.query(sql, callBack);
  }

  findAll(callback) {
    const sql = `SELECT *
                 FROM cities
                 WHERE id > 10`;
    this.query(sql, callback);
  }
}
module.exports = CityDAO;
