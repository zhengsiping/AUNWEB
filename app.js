var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var workstations = require('./routes/workstations');
var customers = require('./routes/customers');
var employees = require('./routes/employee-router');
var devices = require('./routes/device-router');

var app = express();
// Register '.mustache' extension with The Mustache Express
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:source/', function(req, res, next) {
  if (req.params.source === 'api') {
    req.isAPI = true;
  } else if(req.params.source === 'v') {
    req.isAPI = false;
  }
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/:source/workstations', workstations);
app.use('/:source/devices', devices);
app.use('/:source/employees', employees);
app.use('/under_construction', function(req, res) {
  res.render('under_construction', {});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('页面找不到啦～');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const errorMessage = err.errors ? err.errors[0] : err.message ;
  if (req.query.format === 'json' || req.isAPI) {
    res.json({
      sucess: false,
      errors: err.errors ? err.errors : err.message,
      errorMessage: errorMessage
    });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
      errorCode: err.status,
      errorMessage: errorMessage
    });
  }
});

module.exports = app;
