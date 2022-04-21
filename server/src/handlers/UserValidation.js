import emailValidator from "email-validator";
import passwordValidator from "password-validator";

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

const userValidCheck = (req) => {
  if (!req.body.email) {
    return false;
  } else if (!req.body.password1 || !req.body.password2) {
    return false;
  } else if (!req.body.name) {
    return false;
  } else if (!emailValidator.validate(req.body.email)) {
    return false;
  } else if (req.body.password1 !== req.body.password2) {
    return false;
  } else if (!schema.validate(req.body.password1)) {
    return false;
  } else {
    return true;
  }
};

const userValidMsg = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "email not provided" });
  } else if (!req.body.password1 || !req.body.password2) {
    return res.status(400).json({ message: "password not provided" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "name not provided" });
  } else if (!emailValidator.validate(req.body.email)) {
    return res.status(409).json({ message: "email format is not valid" });
  } else if (!schema.validate(req.body.password1)) {
    return res.status(409).json({ message: "password format is not valid" });
  } else if (req.body.password1 !== req.body.password2) {
    return res.status(409).json({ message: "password does not match" });
  }
};

export { userValidCheck, userValidMsg };
