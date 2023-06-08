require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.POSTGRESFIN_URL + "?sslmode=require",
});

module.exports = db;
