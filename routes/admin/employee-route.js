var express = require('express');
var router = express.Router();
var models = require('../../models');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  const defaultPassword = 'auntech1983';
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(defaultPassword, salt);
  models.Employee.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    phone: req.body.phone,
    note: req.body.note,
    qq: req.body.qq
  }).then(function(employee) {
    if (req.isAPI) {
      res.json({
        success: true,
        employee: employee,
        error: ''
      });
    } else {
      res.writeHead(302, {
        'Location': '/v/admin/employees/?created=' + encodeURIComponent(employee.name)
      });
      res.end();
    }
  }).catch(function(errors) {
    console.log(errors);
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

router.get('/:employee_id/destroy', function(req, res) {
  models.Employees.destroy({
    where: {
      id: req.params.employee_id
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

router.post('/validate', function(req, res, next) {
  models.Employee.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(employee) {
    if (employee) {
      bcrypt.compare(req.body.password, employee.password, function(err, valid) {
        if (valid) {
          res.json(employee);
        } else {
          res.json({
            err: 'fails'
          })
        }
      });
    } else {
      res.json({
        err: 'cannot find one'
      })
    }
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
