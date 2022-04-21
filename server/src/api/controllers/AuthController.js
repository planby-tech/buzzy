import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import isValidEmail from "is-valid-email";

const PW_NUM = "^(?=.*[0-9])$";
const PW_ALPHA = "^(?=.*[a-z])$";
const PW_LEN = "^.{8,32}$";

const signup = (req, res, next) => {
  // checks if email already exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (!req.body.email) {
        return res.status(400).json({ message: "email not provided" });
      } else if (!req.body.password1 || !req.body.password2) {
        return res.status(400).json({ message: "password not provided" });
      } else if (!req.body.name) {
        return res.status(400).json({ message: "name not provided" });
      } else if (dbUser) {
        return res.status(409).json({ message: "email already exists" });
      } else if (!isValidEmail(req.body.email)) {
        return res.status(409).json({ message: "email format is not valid" });
      } else if (req.body.password1 !== req.body.password2) {
        return res.status(409).json({ message: "password does not match" });
      } else if (req.body.password1.test(PW_NUM)) {
        return res
          .status(409)
          .json({ message: "password does not include number" });
      } else if (req.body.password1.test(PW_ALPHA)) {
        return res
          .status(409)
          .json({ message: "password does not include alphabet" });
      } else if (req.body.password1.test(PW_LEN)) {
        return res
          .status(409)
          .json({ message: "password length is out of bound" });
      }
      // hash password
      bcrypt.hash(req.body.password1, 12, (err, passwordHash) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "could not hash the password" });
        } else if (passwordHash) {
          return User.create({
            email: req.body.email,
            name: req.body.name,
            password: passwordHash,
          })
            .then(() => {
              res.status(200).json({ message: "user created" });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(502)
                .json({ message: "error while creating the user" });
            });
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const login = (req, res, next) => {
  // checks if email exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: "user not found" });
      } else {
        // password hash
        bcrypt.compare(
          req.body.password,
          dbUser.password,
          (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .json({ message: "error while checking user password" });
            } else if (compareRes) {
              // password match
              const token = jwt.sign({ email: req.body.email }, "secret", {
                expiresIn: "1h",
              });
              res.status(200).json({ message: "user logged in", token: token });
            } else {
              // password doesn't match
              res.status(401).json({ message: "invalid credentials" });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "could not decode the token" });
  }
  if (!decodedToken) {
    res.status(401).json({ message: "unauthorized" });
  } else {
    res.status(200).json({ message: "here is your resource" });
  }
};

export { signup, login, isAuth };
