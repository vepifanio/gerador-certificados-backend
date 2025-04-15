require('dotenv').config();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "mysql"
  },
  test: {
    username,
    password,
    database,
    host,
    dialect: "mysql"
  },
  production: {
    username,
    password,
    database,
    host,
    dialect: "mysql"
  }
  // production: {
  //   username: "lab_cert",
  //   password: "?Y.0!4W_om5*",
  //   database: "ger_cert",
  //   host: "localhost",
  //   dialect: "mysql"
  // }
}
