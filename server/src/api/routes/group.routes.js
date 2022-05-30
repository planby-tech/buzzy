import authJwt from "../middleware/AuthJwt.js";
import verifyGroup from "../middleware/VerifyGroup.js";
import {
  createGroup,
  readGroup,
  updateGroup,
  deleteGroup,
  findUsers,
  findMeetings,
} from "../controllers/GroupController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/groups", [authJwt.verifyToken], createGroup);

  app.get(
    "/groups/:groupId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    readGroup
  );

  app.put(
    "/groups/:groupId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    updateGroup
  );

  app.delete(
    "/groups/:groupId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    deleteGroup
  );

  app.get(
    "/groups/:groupId/users",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findUsers
  );

  app.get(
    "/groups/:groupId/meetings",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findMeetings
  );
};
