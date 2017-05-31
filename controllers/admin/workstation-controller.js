var models  = require('../../models');
var BaseController = require('./base-controller');

class WorkstationController extends BaseController{
  index () {
    models.Workstation.findAll({
      include: [
        {model: models.Employee, as: 'administrator'},
        {model: models.City, as: 'city'},
        {model: models.Province, as: 'province'}
      ]
    }).then((workstations) => {
      let data = {
        title: '移动站管理',
        workstations: workstations
      };
      if (this.query.created) {
        data.createdMessage = '成功创建移动 ' + this.query.created;
      }
      this.render('workstations', data);
    }).catch((errors) => {
      this.error(errors);
    });
  }

  create() {
    models.Workstation.create({
      name: this.body.name ? this.body.name : null,
      cityId: this.body.cityId ? this.body.cityId : null,
      provinceId: this.body.provinceId ? this.body.provinceId : null,
      address: this.body.address ? this.body.address : null,
      administratorId: this.body.administratorId,
      note: this.body.note,
      phone: this.body.phone,
      email: this.body.email
    }).then((workstation) => {
      this.redirect('/admin/workstation/?created=' + encodeURIComponent(workstation.name));
    }).catch((errors) => {
      this.error(errors);
    });
  }

  createForm() {
    models.sequelize.Promise.all([
      models.Employee.findAll(),
      models.City.findAll(),
      models.Province.findAll()
    ]).spread((employees, cities, provinces) => {
      this.render('create_workstation',
        {
          title: '新建移动站',
          employees: employees,
          cities: cities,
          provinces: provinces
        });
    });
  }
}

module.exports = WorkstationController;
