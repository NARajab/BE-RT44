const Sequelize = require("sequelize");
require("dotenv").config();
const mysql2 = require("mysql2");

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mysql",
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // jika Anda menggunakan sertifikat SSL yang tidak disertifikasi oleh CA
    },
  },
});

const databaseValidation = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success connect to database");
  } catch (err) {
    console.error(`Unable to connect to the database: ${err}`);
  }
};

module.exports = {
  databaseValidation,
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    dialectModule: mysql2,
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    dialectModule: mysql2,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    dialectModule: mysql2,
  },
};
