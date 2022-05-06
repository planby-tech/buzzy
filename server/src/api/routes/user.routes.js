import authJwt from "../../middleware/AuthJwt.js";
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  updateUser,
  deleteUser,
  deleteAllUsers,
  findByUser,
} from "../controllers/UserController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

  app.post("/api/user/update", [authJwt.verifyToken], updateUser);

  app.post("/api/user/delete", [authJwt.verifyToken], deleteUser);

  app.post("/api/user/deleteAll", deleteAllUsers);

  app.get("/api/user/findGroups", [authJwt.verifyToken], findByUser);
};
