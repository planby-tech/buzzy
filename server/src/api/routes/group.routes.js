import authJwt from "../middleware/AuthJwt.js";
import verifyGroup from "../middleware/VerifyGroup.js";
import {
  createGroup,
  joinGroup,
  findUsers,
  updateGroup,
  deleteGroup,
} from "../controllers/GroupController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/group/create", [authJwt.verifyToken], createGroup);

  app.post("/api/group/join", [authJwt.verifyToken], joinGroup);

  app.post(
    "/api/group/findUsers",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findUsers
  );

  app.post(
    "/api/group/update",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    updateGroup
  );

  app.post("/api/group/delete", [authJwt.verifyToken], deleteGroup);
};
