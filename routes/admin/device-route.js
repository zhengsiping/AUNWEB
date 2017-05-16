var express = require('express');
var router = express.Router();
var models  = require('../../models');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  models.Device.create({
    name: req.body.name,
    workstationId: req.body.workstationId,
    typeId: req.body.typeId,
    status: {statusId: 1}
  },{
    include: [{
      model: models.DeviceStatus,
      as: 'status'
    }]
  }).then(function(device) {
    res.writeHead(302, {
      'Location': '/v/admin/devices/?created=' + encodeURIComponent(device.name)
    });
    res.end();
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/', function(req, res, next) {
  models.Device.findAll({
    include: [
      {model: models.DeviceType, as: 'type'},
      {model: models.Workstation, as: 'workstation'},
      {
        model: models.DeviceStatus,
        as: 'status',
        include: [{model: models.DeviceStatusType, as: 'status'}]
      }
    ]
  }).then(function(devices) {
    if (req.isAPI) {
      res.json({
        success: true,
        devices: devices,
        error: ''
      });
    } else {
      let data = {
        title: '移动站管理',
        devices: devices
      };
      res.render('devices', data);
    }
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/create', function(req, res, next) {
  models.sequelize.Promise.all([
    models.DeviceType.findAll(),
    models.Workstation.findAll()
  ]).spread(function(deviceTypes, workstations) {
    res.render('create_device',
      {
        title: '新建移动站',
        deviceTypes: deviceTypes,
        workstations: workstations,
      });
  }).catch(function(errors) {
    next({errors: errors})
  });
});

router.get('/startup', function(req, res, next) {
  models.DeviceStatus.update(
    {lastOnlineTime: req.query.startupTime, statusId: 2},
    {
      where: {
       deviceId: req.query.deviceId
      }
    }
  ).then(function(result) {
    if (result[0]) {
      res.json({
        success: true,
        error: ''
      })
    } else {
      res.json({
        success: false,
        error: 'No device found for ' + req.body.deviceId
      })
    }
  }).catch(function(err) {
    next({errors: err});
  })
});

router.get('/shutdown', function(req, res, next) {
  models.DeviceStatus.update(
    {lastOfflineTime: req.query.shutdownTime, statusId: 3},
    {
      where: {
        deviceId: req.query.deviceId
      }
    }
  ).then(function(result) {
    if (result[0]) {
      res.json({
        success: true,
        error: ''
      })
    } else {
      res.json({
        success: false,
        error: 'No device found for ' + req.body.deviceId
      })
    }
  }).catch(function(err) {
    next({errors: err});
  })
});

router.get('/status_update', function(req, res, next) {
  models.DeviceStatus.update(
    {statusId: 2},
    {
      where: {
        deviceId: req.query.deviceId
      }
    }
  ).then(function(result) {
    if (result[0]) {
      res.json({
        success: true,
        error: ''
      })
    } else {
      res.json({
        success: false,
        error: 'No device found for ' + req.body.deviceId
      })
    }
  }).catch(function(err) {
    next({errors: err});
  })
});

module.exports = router;
