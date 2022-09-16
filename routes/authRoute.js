const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

route.post("/register", authController.regisUser);

// route.post("/login", authController.loginUser);

module.exports = route;
