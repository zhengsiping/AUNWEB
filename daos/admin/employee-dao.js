"use strict";
const BaseDAO = require(global.__daoPath + 'base-dao');
class EmployeeDAO extends BaseDAO{
  findById(id, callback) {
    const sql = `SELECT name, username, email, phone, qq, note, password
                 FROM employees
                 WHERE id = :id`;
    this.query(sql, {id: id}, (error, results, fields) => {
      if (results) {
        callback(error, results[0], fields);
      } else {
        callback(error, results, fields);
      }
    });
  }

  create(map, callback) {
    const sql = `INSERT INTO employees 
                 (name, username, email, phone, qq, note, password)
                 VALUES (:name, :username, :email, :phone, :qq, :note, :password)`;
    this.query(sql,
      {
        name: map.name,
        username: map.username,
        email: map.email,
        phone: map.phone,
        qq: map.qq,
        note: map.note,
        password: map.password
      }, callback);
  }

  findAll(callback) {
    const sql = `
      SELECT name, username, email, phone, qq, note, password
      FROM employees
    `;
    this.query(sql, callback);
  }

  update(map, callback) {
    const sql = `
      UPDATE employees
      SET name = :name,
        username = :username,
        email = :email,
        phone = :phone,
        qq = :qq,
        note = :note,
        password = :password
      WHERE id = :id
    `;
    this.query(sql, map, callback);
  }
}
module.exports = EmployeeDAO;
