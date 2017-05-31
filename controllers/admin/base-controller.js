var express = require('express');
var router = express.Router();
const BaseController = require(global.__controllerPath + 'base-controller');
class AdminBaseController extends BaseController{

  render(view, data) {
    data.user = this.req.user;
    // if (this.errors.length > 0) {
    //   this.req.flash('controllerError', 'abc');
    // }
    // if (this.req.flash('controllerError').length > 0) {
    //   this.errors.push(this.req.flash('controllerError'));
    // }
    if (this.errors.length > 0) {
      data.pageErrors = this.errors;
    }
    this.res.render('admin/' + view, data);
  }

  error(errors) {
    this.next(errors);
  }

  addError(error) {
    this.errors.push(error);
  }

  redirect(url) {
    this.res.writeHead(302, {
      'Location': url
    });
    this.res.end();
  }

  route(req, res, next) {
    // const pathArray = req.path.split('/');
    // if (pathArray.length === 1) {
    //   if (isNaN(pathArray[0])) {
    //     this.id = pathArray[0]
    //     this.action = 'show';
    //   } else {
    //     this.action = path[0];
    //   }
    // } else if(pathArray.length === 2) {
    //   if (isNaN(pathArray[0])) {
    //     this.id = pathArray[0];
    //     this.action = pathArray[1];
    //   } else {
    //
    //   }
    // } else if (pathArray.length === 0) {
    //   this.action = 'index';
    // }
  }
}
module.exports = AdminBaseController;
