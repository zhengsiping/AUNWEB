"use strict";
const BaseModel = require(global.__modelPath + 'base-model');
const EmployeeDAO = require(global.__daoPath + 'admin/employee-dao');
const DataType = BaseModel.DataType;

const properties = {
  id: DataType.integer,
  name: DataType.string,
  username: DataType.string,
  email: DataType.string,
  phone: DataType.string,
  qq: DataType.integer,
  note: DataType.integer,
  password: DataType.string
};

const staticProperties = {

};

class EmployeeModel extends BaseModel {
  constructor() {
    super();
    this.dao = new EmployeeDAO();
    this.setModelProperties(properties);
  }

  create(map, callback) {
    map.password = this.hashPassword(map.password);
    this.dao.create(map, (error, results, fields) => {
      if (error) {callback(error, this)}
      const id = results.insertId;
      this.findById(id, callback);
    });
  }

  findById(id, callback) {
    this.dao.findById(id, (error, results, fields) => {
      this.populate(results);
      callback(error, this);
    });
  }

  update(map, callback) {
    this.name = map.name;
    this.username = map.username;
    this.qq = map.qq;
    this.email = map.email;
    this.note = map.note;
    this.phone = map.phone;
    this.password = map.password;
    this.dao.update(map, (error, results, fields) => {
      callback(error);
    })
  }

  hashPassword(password) {
    const bcrypt = require('bcrypt'),
      saltRounds = 10,
      salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = EmployeeModel;
