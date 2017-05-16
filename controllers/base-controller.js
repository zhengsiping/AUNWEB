var express = require('express');
var router = express.Router();
class BaseController {
  constructor (req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.body = req.body;
    this.query = req.query;
  }

  render(view, data) {
    this.res.render('admin/' + view, data);
  }

  error(errors) {
    this.next(errors);
  }

  redirect(url) {
    res.writeHead(302, {
      'Location': url
    });
    res.end();
  }
}
module.exports = BaseController;
