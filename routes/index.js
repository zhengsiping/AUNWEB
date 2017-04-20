var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  models.User.findAll({
    include: [models.Task]
  }).then(function(users) {
    res.render('index', {
      title: 'result',
      users: users
    });
  })
});

module.exports = router;
