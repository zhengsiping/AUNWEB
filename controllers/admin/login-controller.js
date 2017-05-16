var models  = require('../../models');
var BaseController = require('./base-controller');


class LoginController extends BaseController{
  index () {
    this.render('login', {layout: false});
  }
}

module.exports = LoginController;

