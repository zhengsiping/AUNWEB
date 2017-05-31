"use strict";
const BaseModel = require('./base-model');
const CityDAO = require('../daos/city-dao');

const properties = {
  id: BaseModel.dataType.integer,
  name: BaseModel.dataType.string
};

const staticProperties = {

};

class CityModel extends BaseModel {
  constructor() {
    super();
    this.dao = new CityDAO();
    this.setModelProperties(properties);
  }

  findById(id, callBack) {
    this.dao.findById(id, (error, results, fields) => {
      this.populate(results);
      callBack(error, this);
    });
  }
}

module.exports = CityModel;
