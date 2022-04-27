const { verifySignUp } = require("../../middleware");
const controller = require("../controllers/AuthController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkValidEmail,
      verifySignUp.checkValidPassword,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/login", controller.login);
};

// import express from "express";
// import {
//   checkValidEmail,
//   checkValidPassword,
//   checkRolesExisted,
// } from "../../middleware/VerifySignup.js";
// import { signup, login } from "../controllers/AuthController.js";

// const router = express.Router();

// router.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

// router.post(
//   "/api/auth/signup",
//   [checkValidEmail, checkValidPassword, checkRolesExisted],
//   signup
// );

// router.post("/api/auth/login", login);

// export { router };
