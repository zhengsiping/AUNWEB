var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.post('/create', function(req, res, next) {
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
        'Location': '/v/employees/?created=' + employee.lastName + employee.firstName
      });
      res.end();
    }
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/create', function(req, res) {
  if (req.isAPI) {
    req.json({
      success: false,
      error: 'please use POST'
    })
  } else {
    res.render('create_employee', {title: '创建管理员'});
  }
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

router.get('/:employee_id/', function(req, res) {
  models.Employee.findById(req.params.employee_id).then(function(employee) {
    res.json(employee);
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/', function(req, res) {
  models.Employee.findAll().then(function(employees) {
    if (req.isAPI) {
      res.json({
        success: true,
        employees: employees,
        error: ''
      });
    } else {
      let data = {
        title: '职员管理',
        employees:employees
      };
      if (req.query.created) {
        data.createdMessage = '成功创建用户 ' + req.query.created;
      }
      res.render('employees', data);
    }
  })
});

module.exports = router;
