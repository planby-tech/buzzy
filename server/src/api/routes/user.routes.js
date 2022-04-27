const { authJwt } = require("../../middleware");
const controller = require("../controllers/UserController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

// import express from "express";
// import {
//   verifyToken,
//   isAdmin,
//   isModerator,
//   isModeratorOrAdmin,
// } from "../../middleware/AuthJwt.js";
// import {
//   allAccess,
//   userBoard,
//   adminBoard,
//   moderatorBoard,
// } from "../controllers/UserController.js";

// const router = express.Router();

// router.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

// router.get("/api/test/all", allAccess);

// router.get("/api/test/user", [verifyToken], userBoard);

// router.get("/api/test/mod", [verifyToken, isModerator], moderatorBoard);

// router.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);

// export { router };
