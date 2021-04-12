require('dotenv').config();

const username = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres"
  },
  test: {
     username,
    password,
    database,
    host,
    dialect: "mysql"
  },
  production: {
    username: "mysql11388",
    password: "5FklvCLhv1u6Kbh",
    database: "ger_cert",
    host: "localhost",
    dialect: "mysql"
  }
}
