import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import db from "../models/index.js";

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(32)
  .has()
  .lowercase(2)
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

const ROLES = db.ROLES;
const User = db.user;

const checkValidEmail = (req, res, next) => {
  console.log("ssibal");
  console.log(req.body);
  if (!req.body.email) {
    res.status(400).send({ message: "Email is not provided" });
    return;
  } else if (!emailValidator.validate(req.body.email)) {
    res.status(409).send({ message: "Email format is not valid" });
    return;
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

const checkValidPassword = (req, res, next) => {
  if (!req.body.password1 || !req.body.password2) {
    res.status(400).json({ message: "Password is not provided" });
    return;
  } else if (req.body.password1 !== req.body.password2) {
    res.status(409).json({ message: "Password does not match" });
    return;
  } else if (!schema.validate(req.body.password1)) {
    res.status(409).json({ message: "Password format is not valid" });
    return;
  }
  next();
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkValidEmail: checkValidEmail,
  checkValidPassword: checkValidPassword,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
