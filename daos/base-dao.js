class BaseDAO {
  constructor() {
  }

  query(sql, data, callback) {
    const mysql      = require('mysql');
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '47745862',
      database : 'database_development'
    });
    this.connection.config.queryFormat = function (query, values) {
      if (!values) return query;
      return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
          return this.escape(values[key]);
        }
        return txt;
      }.bind(this));
    };
    this.connection.config.queryFormat = function (query, values) {
      if (!values) return query;
      return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
          return this.escape(values[key]);
        }
        return txt;
      }.bind(this));
    };
    this.connection.connect();
    this.connection.query(sql, data, callback);
    this.connection.end();
  }
}
module.exports = BaseDAO;
