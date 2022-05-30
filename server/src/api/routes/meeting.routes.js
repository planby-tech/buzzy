import authJwt from "../middleware/AuthJwt.js";
import verifyGroup from "../middleware/VerifyGroup.js";
import {
  createMeeting,
  readMeeting,
  updateMeeting,
  deleteMeeting,
  findPlaces,
  findUsers,
  findActivities,
} from "../controllers/MeetingController.js";

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

  app.get(
    "/meetings/:meetingId/places",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findPlaces
  );

  app.get(
    "/meetings/:meetingId/users",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findUsers
  );

  app.get(
    "/meetings/:meetingId/activities",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    findActivities
  );
};
