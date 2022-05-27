import authJwt from "../middleware/AuthJwt.js";
import {
  updateUser,
  deleteUser,
  deleteAllUsers,
  findGroups,
} from "../controllers/UserController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/update", [authJwt.verifyToken], updateUser);

  app.post("/api/user/delete", [authJwt.verifyToken], deleteUser);

  app.post("/api/user/deleteAll", deleteAllUsers);

  app.get("/api/user/findGroups", [authJwt.verifyToken], findGroups);
};
