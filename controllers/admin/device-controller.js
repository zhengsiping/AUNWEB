var models  = require('../../models');
var BaseController = require('./base-controller');


class DeviceController extends BaseController{
  index () {
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
    }).then((devices) => {
      const view = 'devices';
      const data = {
          title: '移动站管理',
          devices: devices
        };
      if (this.query.created) {
        data.createdMessage = '成功创建设备 ' + this.query.created;
      }
      this.render(view, data);
    }).catch((errors) => {
      this.error(errors);
    });
  }

  create() {
    models.Device.create({
      name: this.body.name,
      workstationId: this.body.workstationId,
      typeId: this.body.typeId,
      status: {statusId: 1}
    },{
      include: [{
        model: models.DeviceStatus,
        as: 'status'
      }]
    }).then((device) => {
      this.redirect('/v/admin/devices/?created=' + encodeURIComponent(device.name));
    }).catch((errors) => {
      this.error(errors);
    });
  }

  createForm() {
    models.sequelize.Promise.all([
      models.DeviceType.findAll(),
      models.Workstation.findAll()
    ]).spread((deviceTypes, workstations) => {
      this.render('create_device',
        {
          title: '新建移动站',
          deviceTypes: deviceTypes,
          workstations: workstations,
        });
    }).catch((errors) => {
      this.error(errors);
    });
  }
}

module.exports = DeviceController;

