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
}
