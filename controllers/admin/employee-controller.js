var bcrypt = require('bcrypt');
var models  = require('../../models');
var BaseController = require('./base-controller');

class EmployeeController extends BaseController{
  index () {
    models.Employee.findAll().then((employees) => {
      let data = {
        title: '职员管理',
        employees:employees
      };
      if (this.query.created) {
        data.createdMessage = '成功创建用户 ' + this.query.created;
      }
      this.render('employees', data);
    })
  }

  create() {
    const defaultPassword = 'auntech1983';
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(defaultPassword, salt);
    models.Employee.create({
      name: this.this.body.name,
      username: this.this.body.username,
      email: this.this.body.email,
      password: hash,
      phone: this.this.body.phone,
      note: this.this.body.note,
      qq: this.this.body.qq
    }).then((employee) => {
      this.redirect('/v/admin/employees/?created=' + encodeURIComponent(employee.name));
    }).catch((errors) => {
      this.error(errors)
    });
  }

  createForm() {
    this.render('create_employee', {title: '创建管理员'});
  }
}

module.exports = EmployeeController;


