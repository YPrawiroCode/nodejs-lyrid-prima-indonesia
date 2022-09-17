const Sequelize = require("sequelize");

require("dotenv").config();

const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

// const { DataTypes } = Sequelize;

//1. open connection sequelize
const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    port: process.env.PORT_DB
    // ssl: true,
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
  productModel: productModel(sequelizeInstance, Sequelize.DataTypes),
};
