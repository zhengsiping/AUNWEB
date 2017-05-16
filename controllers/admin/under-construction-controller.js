var models  = require('../../models');
var BaseController = require('./base-controller');


class DeviceController extends BaseController{
  index () {
    this.render('under_construction', {});
  }
}

module.exports = DeviceController;

