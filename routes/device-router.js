var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  if (true) {
    res.writeHead(302, {
      'Location': '/v/devices/?created='});
    res.end();
  }
});

router.get('/', function(req, res, next) {
  res.render('devices', {title: '设备站列表'});
});

router.get('/create', function(req, res, next) {
  res.render('create_device', {title: '创建新设备'});
});

module.exports = router;
