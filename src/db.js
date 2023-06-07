require("dotenv").config();
const { Pool } = require("pg");

const {
  POSTGRESFIN_USER,
  POSTGRESFIN_PASSWORD,
  POSTGRESFIN_DATABASE,
  POSTGRESFIN_HOST,
  DB_PORT,
  POSTGRESFIN_URL,
} = process.env;

const db = new Pool(
  DB_URL
    ? {
        connectionString: POSTGRESFIN_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: POSTGRESFIN_USER,
        password: POSTGRESFIN_PASSWORD,
        database: POSTGRESFIN_DATABASE,
        host: POSTGRESFIN_HOST,
        port: Number(DB_PORT),
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

module.exports = db;
