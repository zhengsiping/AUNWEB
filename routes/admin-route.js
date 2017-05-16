var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var session = require('express-session')
var models = require('../models');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.use(session({cookie: {maxAge: 60000}, secret: 'aun_session'}));
router.use(passport.initialize());
router.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, done) {
    models.Employee.findOne({
      where: {
        username: username
      }
    }).then(function(employee) {
      if (!employee) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, employee.password, function(err, valid) {
        if (valid) {
          return done(null, employee);
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
      })
    }).catch(function(errors) {
      return done(errors);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.Employee.findById(id).then(function(user) {
    return done(null, user);
  }).catch(function(errors) {
    return done(errors, null);
  });
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/v/admin');
  } else {
    Controller = require('../controllers/admin/login-controller');
    const instance = new Controller(req, res, next);
    instance.index();
  }

});
router.post('/login',
  passport.authenticate('local', { successRedirect: '/v/admin',
    failureRedirect: '/v/admin/login',
    failureFlash: true })
);


router.use('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/v/admin/login');
});

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.path === '/') {
      Controller = require('../controllers/admin/index-controller');
      const instance = new Controller(req, res, next);
      instance.index();
    } else {
      let Controller = null;
      let found = null;
      let action = null;
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
        if (action && typeof  instance[action] === 'function') {
          req.id = id;
          instance[action]();
        } else {
          const err = new Error('页面行为没有找到');
          err.status = 404;
          next(err);
          return;
        }
      } else {
        const err = new Error('页面没有找到');
        err.status = 404;
        next(err);
        return;
      }
    }
  } else {
    if (req.isAjax) {

    } else {
      req.flash('errorMsg', 'You are not log in');
      res.redirect('/v/admin/login');
    }
  }
});

module.exports = router;
