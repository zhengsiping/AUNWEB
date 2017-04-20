var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.post('/create', function(req, res) {
  console.log(req.body);
  models.Customer.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:customer_id/destroy', function(req, res) {
  models.Customers.destroy({
    where: {
      id: req.params.customer_id
    }
  }).then(function() {
    res.redirect('/');
  })
});

router.get('/:customer_id', function(req, res) {
  models.Customers.findOne({
    where: {
      id: req.params.customer_id
    }
  }).then(function() {
    res.render('index', {
      title: 'result',
      users: users
    });
  })
});

module.exports = router;