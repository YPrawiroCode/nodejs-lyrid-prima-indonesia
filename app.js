const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Setup express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//set CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//import router
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

//routing API
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);

//Routing Homepage
app.get("/", (req, res) => {
  res.send("Hello World, Welcome to test PT. Lyrid Prima Indonesia API");
});

//404 Not Found End Point URL
app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.");
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
