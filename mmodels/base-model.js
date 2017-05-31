class BaseModel {
  constructor() {
    BaseModel.properties = {};
  }

  setModelProperties(properties) {
    BaseModel.properties = properties;
  }

  populate(maps) {
    for(const property in BaseModel.properties) {
      if (maps.hasOwnProperty(property)) {
        this[property] = maps[property];
      }
    }
  }
}
BaseModel.DataType = {
  bool: 0,
  integer: 1,
  float: 2,
  string: 3
};
module.exports = BaseModel;
