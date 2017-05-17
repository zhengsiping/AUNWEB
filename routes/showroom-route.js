var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var session = require('express-session')
var models = require('../models');

router.use(session({cookie: {maxAge: 60000}, secret: 'showroom_session'}));

router.use('/a', function (req, res, next) {

});

// router.use('/', function(req, res, next) {
//   if (req.path === '') {
//     res.render('showroom/index', {layout: false});
//   } else {
//     next();
//   }
// });

router.use('/', (req, res, next) => {
  let Controller = null;
  let found = null;
  let action = null;
  if (req.path === '/') {
    try {
      Controller = require('../controllers/showroom/index-controller');
      const instance = new Controller(req, res, next);
      instance.index();
    } catch (e) {

    }
  } else {
    const pathArray = req.path.split('/');
    let path = '/';
    let actionArray = [];
    pathArray.forEach((s) => {
      if (!Controller) {
        path += s;
        try {
          Controller = require('../controllers/admin' + path + '-controller');
        } catch(e) {
          // do nothing, continue searching
        }
      } else {
        if (s !== '') {
          actionArray.push(s);
        }
      }
    });
    let id = null;
    if (Controller) {
      if (actionArray.length === 0) {
        action = 'index';
      } else if(actionArray.length === 1){
        action = actionArray[0] ;
      } else if(actionArray.length === 2) {
        id = actionArray[0];
        action = actionArray[1];
      }
      const instance = new Controller(req, res, next);
      if (action && typeof instance[action] === 'function') {
        req.id = id;
        instance[action]();
      } else {
        const err = new Error('页面行为没有找到');
        err.status = 404;
        next(err);
      }
    } else {
      // const err = new Error('页面没有找到');
      // err.status = 404;
      // next(err);
    }
  }
  if (!Controller) {
    const fs = require('fs');
    const path = req.path;
    res.render('showroom' + (path ? path : '/index'), {layout: false}, function(err, html) {
      if (err) {
        if (err.message.indexOf('Failed to lookup view') !== -1) {
          const err = new Error('页面没有找到');
          err.status = 404;
          next(err);
          return;
        } else {
          throw err;
          return;
        }
      }
      res.send(html);
    });
  }
});

function showStaticPage(req, res, next) {
  const fs = require('fs');
  const path = req.path.replace('/s', '');
  console.log(path);
  res.render('showroom' + (path ? path : 'index'), {layout: false}, function(err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        const err = new Error('页面没有找到');
        err.status = 404;
        next(err);
        return;
      } else {
        throw err;
        return;
      }
    }
    res.send(html);
  });
}
router.use('/s', function(req, res, next) {
  const fs = require('fs');
  const path = req.path.replace('/s', '');
  console.log(path);
  res.render('showroom' + (path ? path : '/index'), {layout: false}, function(err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        const err = new Error('页面没有找到');
        err.status = 404;
        next(err);
        return;
      } else {
        throw err;
        return;
      }
    }
    res.send(html);
  });
  // try {
  //
  // } catch (e) {
  //
  // }
  // // res.render('store' + path, {layout: false});
  // if (fs.existsSync('../views/store/about.handlebars')) {
  //   console.log('ere');
  //
  // }
  // res.end();
  // if (fs.existsSync('../views/store' + path + '.handlebars')) {
  //   res.render('store' + path, {layout: false});
  //   // Do something
  // } else {
  //   const err = new Error('页面行为没有找到');
  //   err.status = 404;
  //   next(err);
  // }
});

module.exports = router;
