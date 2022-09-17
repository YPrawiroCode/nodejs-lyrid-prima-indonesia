const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const { userModel } = require("../database/config");
const method = {};

require("dotenv").config();

method.regisUser = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const email = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!email) {
      const dtReguser = await userModel.create({
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });

      const {
        id,
        email,
        first_name,
        last_name,
      } = dtReguser;
      const token = await jwt.sign(
        {
          id,
          email,
          first_name,
          last_name,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).send({
        message: "Successfully registered",
        token,
        data:{
          id,
          email,
          first_name,
          last_name
        }
      });
    } 
    else{
      res.status(400).send({
        message: "email already taken",
      });
    }
    } else {
      res.status(400).send({
        message: "Phone and Email already taken",
      });
  }
}

method.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      user = await userModel.findOne({
        where: {
          email: email,
        },
      });
    }

    if (user) {
      if (passwordHash.verify(password, user.password)) {
        const {
          id,
          email,
          first_name,
          last_name,
        } = user;
        const token = jwt.sign(
          //
          {
            id,
            email,
            first_name,
            last_name,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).send({
          message: "Login success",
          token,
        });
      } else {
        res.status(401).send({ message: "Password is wrong" });
      }
    } else {
      res.status(401).send({ message: "Email not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = method;
