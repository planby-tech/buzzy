import authJwt from "../middleware/AuthJwt.js";
import verifyGroup from "../middleware/VerifyGroup.js";
import {
  createMeeting,
  readMeeting,
  updateMeeting,
  deleteMeeting,
} from "../controllers/MeetingController";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/groups/:groupId/meetings",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    createMeeting
  );
  app.get(
    "/groups/:groupId/meetings/:meetingId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    readMeeting
  );
  app.put(
    "/groups/:groupId/meetings/:meetingId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    updateMeeting
  );
  app.delete(
    "/groups/:groupId/meetings/:meetingId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    deleteMeeting
  );
};
