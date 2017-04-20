var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.post('/create', function(req, res) {
  console.log(req.body);
  console.log(req.query);
  models.Employee.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: '123456'
  }).then(function(employee) {
    if (req.isAPI) {
      res.json({
        success: true,
        employee: employee,
        error: ''
      });
    } else {
      res.writeHead(302, {
        'Location': '/employees/?created=' + employee.lastName + employee.firstName
      });
      res.end();
    }
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/create', function(req, res) {
  res.render('create_employee', {title: '创建管理员'});
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
  models.Workstation.findById(req.params.workstation_id).then(function(workstation) {
    res.json(workstation);
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/', function(req, res) {
  models.Employee.findAll().then(function(employees) {
    res.render('employees', {
      title: '职员管理',
      createdMessage: '成功创建用户 ' + req.query.created,
      employees:employees
    });
  })
});

module.exports = router;
