const BaseCollection = require(global.__modelPath + 'base-collection');
const EmployeeModel = require(global.__modelPath + '/admin/employee-model');

class EmployeeCollection extends BaseCollection{
  constructor() {
    super();
    const DAO = require(global.__daoPath + 'admin/employee-dao');
    this.dao = new DAO();
  }
  createModel(map) {
    console.log(map);
    const model = new EmployeeModel();
    model.populate(map);
    return model;
  }

  findAll(callback) {
    this.dao.findAll((error, results, fields) => {
      this.populate(results);
      callback(error, this);
    });
  }
}
module.exports = EmployeeCollection;