var models  = require('../../models');
var BaseController = require('./base-controller');

class EmployeeController extends BaseController{
  index () {
    const EmployeeCollection = require(global.__modelPath + 'admin/employee-collection');
    const collection = new EmployeeCollection();
    collection.findAll((error, employees) => {
      if (error) { this.error(error); }
      let data = {
        title: '职员管理',
        employees:employees
      };
      if (this.query.created) {
        data.createdMessage = '成功创建用户 ' + this.query.created;
      }
      this.render('employees', data);
    });
  }

  create() {
    this.formValidate();
    this.req.getValidationResult().then((result) => {
      if (!result.isEmpty() || this.errors.length > 0) {
        const errors = result.array().forEach((e) => {
          this.addError( e.msg);
        });
        this.req.flash('errors', this.errors.join('&'));
        this.redirect('/admin/employee/createForm');
        return;
      }
      const EmployeeModel = require(global.__modelPath + 'admin/employee-model');
      const model = new EmployeeModel();
      const defaultPassword = 'auntech1983';
      model.create({
        name: this.req.body.name,
        username: this.req.body.username,
        email: this.req.body.email,
        password: defaultPassword,
        phone: this.req.body.phone,
        note: this.req.body.note,
        qq: this.req.body.qq
      }, (error, model) => {
        if (error) { this.error(error); }
        this.redirect('/admin/employee/?created=' + encodeURIComponent(model.name));
      });
    });
  }

  createForm() {
    const errors = this.req.flash('errors');
    if (errors.length > 0) {
      this.addErrors(errors);
    }
    this.render('create_employee', {title: '创建管理员', action: '/admin/employee/create', errors: this.errors});
  }

  profile() {
    const id = this.req.user.id;
    const errors = this.req.flash('errors');
    if (errors.length > 0) {
      console.log(errors);
      this.addErrors(errors);
    }
    this.updateEmployee(id, '/admin/employee/profile', '/admin/employee/profile');
  }

  update() {
    const id = this.req.id;
    const action = '/admin/employee/' + id + '/update';
    const errors = this.req.flash('errors');
    if (errors.length > 0) {
      this.addErrors(errors);
    }
    this.updateEmployee(id, action, action);
  }

  updateEmployee(id, action, redirectUrl) {
    const EmployeeModel = require(global.__modelPath + 'admin/employee-model');
    const model = new EmployeeModel();
    model.findById(id, (error, model) => {
      if (error) {this.error(error);}
      if (model) {
        if (this.req.method === 'GET') {
          this.render('create_employee', {
            model: model,
            action: action,
            errors: this.errors
          });
        } else if (this.req.method === 'POST') {
          this.formValidate();
          this.req.getValidationResult().then((result) => {
            if (!result.isEmpty() || this.errors.length > 0) {
              const errors = result.array().forEach((e) => {
                this.addError( e.msg);
              });
              this.req.flash('errors', this.errors);
              this.redirect(redirectUrl);
              return;
            }
            let password = '';
            if (this.body.password !== '' && this.body.password.trim() !== '') {
              password = model.hashPassword(this.body.password);
            }
            model.update({
              name: this.body.name,
              username: this.body.username,
              email: this.body.email,
              password: password,
              phone: this.body.phone,
              note: this.body.note,
              qq: this.body.qq,
              id: id
            }, (error) => {
              if (error) {this.error(error);}
              this.render('create_employee', {
                model: model,
                action: action
              });
            });
          });
        }
      } else {
        this.redirect('/admin/employee');
      }
    });
  }

  formValidate() {
    this.req.checkBody('name', '名字不能为空').notEmpty();
    this.req.checkBody('username', '用户名不能为空').notEmpty();
    this.req.checkBody('username', '用户名在4-15字符之间').isLength({min:4, max: 15});
    if (this.req.body.password !== this.req.body.confirmPassword) {
      this.addError('用户密码输入不一致.');
    }
  }
}

module.exports = EmployeeController;


