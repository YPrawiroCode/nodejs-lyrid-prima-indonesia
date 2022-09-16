const Sequelize = require("sequelize");

const userModel = require("../models/userModel");

const { DataTypes } = Sequelize;

//1. open connection sequelize
const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.PORT,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
);

//2. test connection sequelize
sequelizeInstance
  .authenticate()
  .then((res) =>
    console.log("Connection has been established successfully. ", res)
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = {
  userModel: userModel(sequelizeInstance, Sequelize.DataTypes),
};
