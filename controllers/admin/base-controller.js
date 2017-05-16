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

  route(req, res, next) {
    // console.log('xuexue');
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
    res.json({'hee': {}});
  }
}
module.exports = BaseController;
