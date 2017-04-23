var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  models.Workstation.create({
    stationName: req.body.stationName,
    city: req.body.ctiy,
    province: req.body.province,
    address: req.body.address,
    administratorId: req.body.administratorId
  }).then(function(workstation) {
    res.json({
      success: true,
      workstation: workstation,
      error: ''
    });
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/', function(req, res, next) {
  res.render('workstations', {title: '移动站列表'});
});

router.get('/create', function(req, res, next) {
  res.render('create_workstation', {title: '新建移动站'});
});

router.get('/:workstation_id/destroy', function(req, res) {
  models.Workstation.destroy({
    where: {
      id: req.params.workstation_id
    }
  }).then(function() {
    res.redirect('/');
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/:workstation_id', function(req, res) {
  models.Workstation.findById(req.params.workstation_id, {include: [{model: models.Employee, as: 'administrator'}]}).then(function(workstation) {
    res.json(workstation);
  }).catch(function(errors) {
    next({errors: errors})
  });
});

module.exports = router;
