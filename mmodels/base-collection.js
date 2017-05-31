require("collections/shim-array");
require("collections/listen/array-changes");
class BaseCollection extends Array {
  constructor() {
    super();
  }

  createModel(map) {
    // please implement this in the subclass
    return {};
  }

  populate(data) {
    if (data) {
      console.log(data);
      for(let i = 0; i < data.length; i++) {
        this.push(this.createModel(data[i]));
      }
    }
  }
}
module.exports = BaseCollection;