var express = require('express');
var router = express.Router();
var models  = require('../../models');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  models.Workstation.create({
    name: req.body.name ? req.body.name : null,
    cityId: req.body.cityId ? req.body.cityId : null,
    provinceId: req.body.provinceId ? req.body.provinceId : null,
    address: req.body.address ? req.body.address : null,
    administratorId: req.body.administratorId,
    note: req.body.note,
    phone: req.body.phone,
    email: req.body.email
  }).then(function(workstation) {
    if (req.isAPI) {
      res.json({
        success: true,
        workstation: workstation,
        error: ''
      });
    } else {
      res.writeHead(302, {
        'Location': '/v/admin/workstations/?created=' + encodeURIComponent(workstation.name)
      });
      res.end();
    }
  }).catch(function(errors) {
    console.log(errors);
    next({errors: errors})
  });
});

router.get('/', function(req, res, next) {
  models.Workstation.findAll({
    include: [
      {model: models.Employee, as: 'administrator'},
      {model: models.City, as: 'city'},
      {model: models.Province, as: 'province'}
    ]
  }).then(function(workstations) {
    if (req.isAPI) {
      res.json({
        success: true,
        workstations: workstations,
        error: ''
      });
    } else {
      let data = {
        title: '移动站管理',
        workstations: workstations
      };
      if (req.query.created) {
        data.createdMessage = '成功创建移动 ' + req.query.created;
      }
      res.render('workstations', data);
    }
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/create', function(req, res, next) {
  models.sequelize.Promise.all([
    models.Employee.findAll(),
    models.City.findAll(),
    models.Province.findAll()
  ]).spread(function(employees, cities, provinces) {
    res.render('create_workstation',
      {
        title: '新建移动站',
        employees: employees,
        cities: cities,
        provinces: provinces
      });
  });
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
  models.Workstation.findById(
    req.params.workstation_id,
    {
      include: [
        {model: models.Employee, as: 'administrator'},
        {model: models.City, as: 'city'},
        {model: models.Province, as: 'province'}
      ]
    }
  ).then(function(workstation) {
    if (req.isAPI) {
      res.json({
        success: true,
        workstation: workstation,
        error: ''
      });
    } else {
      next();
    }
  }).catch(function(errors) {
    next({errors: errors})
  });
});

module.exports = router;
