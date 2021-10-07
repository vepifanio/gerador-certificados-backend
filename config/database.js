require('dotenv').config();

const laboroENV = process.env.LABORO_ENV

const username = laboroENV ? process.env.LABORO_USER : process.env.USER;
const password = laboroENV ? process.env.LABORO_PASSWORD : process.env.PASSWORD;
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
    username: "root",
    password: "!nL3oCN(r*AdmCe8",
    database: "ger_cert",
    host: "localhost",
    dialect: "mysql"
  }
}
