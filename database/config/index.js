const Sequelize = require("sequelize");

const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

// const { DataTypes } = Sequelize;

//1. open connection sequelize
const sequelizeInstance = new Sequelize(
  "test",
  "prawiro",
  "admin",
  {
    host:"localhost",
    dialect: "postgres",
    port: 5435,
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
