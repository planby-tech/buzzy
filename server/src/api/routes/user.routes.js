import express from "express";
import {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
} from "../middleware/AuthJwt";
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
} from "../controllers/UserController";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", allAccess);

router.get("/api/test/user", [verifyToken], userBoard);

router.get("/api/test/mod", [verifyToken, isModerator], moderatorBoard);

router.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);
