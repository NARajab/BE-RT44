const Sequelize = require("sequelize");
require("dotenv").config();

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mysql",
  logging: false, // Optional: disable logging; default: console.log
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
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
  },
};
