import express from "express";
import {
  checkValidEmail,
  checkValidPassword,
  checkRolesExisted,
} from "../../middleware/VerifySignup";
import { signup, login } from "../controllers/AuthController";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [checkValidEmail, checkValidPassword, checkRolesExisted],
  signup
);

router.post("/api/auth/login", login);
