const express = require("express");
const route = express.Router();
const productController = require("../controllers/productController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

route.post("/create", tokenMiddleware.verifyToken, productController.createProduct);

route.get("/readall", tokenMiddleware.verifyToken, productController.getAllProduct);

route.get("/read/:id", tokenMiddleware.verifyToken, productController.readProduct);

route.put("/update/:id", tokenMiddleware.verifyToken, productController.updateProduct);

route.delete("/del/:id", tokenMiddleware.verifyToken, productController.deleteProduct);

module.exports = route;
