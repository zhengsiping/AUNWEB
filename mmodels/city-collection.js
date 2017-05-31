const BaseCollection = require('./base-collection');
const CityModel = require('./city-model');

class CityCollection extends BaseCollection{
  constructor() {
    super();
    const DAO = require('../daos/city-dao');
    this.dao = new DAO();
  }
  createModel(map) {
    console.log(map);
    const model = new CityModel();
    model.populate(map);
    return model;
  }

  findAll(callback) {
    this.dao.findAll((error, results, fields) => {
      this.populate(results);
      console.log(this);
      callback(error, this);
    });
  }
}
module.exports = CityCollection;