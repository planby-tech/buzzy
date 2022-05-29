import authJwt from "../middleware/AuthJwt.js";
import {
  readUser,
  updateUser,
  deleteUser,
  joinGroup,
  findGroups,
  findMeetings,
} from "../controllers/UserController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/users/:userId", [authJwt.verifyToken], readUser);

  app.put("/users/:userId", [authJwt.verifyToken], updateUser);

  app.delete("/users/:userId", [authJwt.verifyToken], deleteUser);

  app.post("/users/:userId/groups", [authJwt.verifyToken], joinGroup);

  app.get("/users/:userId/groups", [authJwt.verifyToken], findGroups);

  app.get("/users/:userId/meetings", [authJwt.verifyToken], findMeetings);
};
