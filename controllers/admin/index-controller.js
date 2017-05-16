var models  = require('../../models');
var BaseController = require('./base-controller');


class IndexController extends BaseController{
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
      const onlineDevices = [];
      const offlineDevices = [];
      devices.forEach((device) => {
        if (device.status.status.id === 2) {
          onlineDevices.push(device);
        } else {
          offlineDevices.push(device);
        }

      });
      const view = 'index';
      const data = {
        title: '所有设备',
        onlineDevices: onlineDevices,
        offlineDevices: offlineDevices
      };
      this.render(view, data);
    }).catch((errors) => {
      this.error(errors);
    });
  }
}

module.exports = IndexController;

