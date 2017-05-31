var express = require('express');
var router = express.Router();
class BaseController {
  constructor (req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.body = req.body;
    this.query = req.query;
    this.errors = [];
    this.validator = require('validator');
  }

  render(view, data) {
    // this.res.render('admin/' + view, data);
  }

  error(errors, message) {
    this.next(errors);
  }

  addError(error) {
    this.errors.push(error);
  }

  addErrors(errors) {
    this.errors = this.errors.concat(errors);
  }

  addValidationErrors(errors) {
    if (Array.isArray(errors)) {
      errors.forEach((e) => {
        this.addError(e.msg);
      })
    }

  }


  redirect(url) {
    this.res.writeHead(302, {
      'Location': url
    });
    this.res.end();
  }
}
module.exports = BaseController;
