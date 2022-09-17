const jwt = require("jsonwebtoken");
const joi = require("joi");

require("dotenv").config();

const tokenMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.header("Authorization");
    console.log("🚀 ~ file: tokenMiddleware.js ~ line 10 ~ verifyToken: ~ token", token)
    if (!token)
      return res.status(401).json({ message: "Failed to authenticate Token" });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.token = verified;
      next();
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "invalid token",
        data: error,
      });
    }
  },
};

module.exports = tokenMiddleware;