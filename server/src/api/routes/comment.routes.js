import authJwt from "../middleware/AuthJwt.js";
import verifyGroup from "../middleware/VerifyGroup.js";
import {
  createComment,
  readComment,
  updateComment,
  deleteComment,
} from "../controllers/CommentController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/meetings/:meetingId/users/:userId/comments",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    createComment
  );

  app.get(
    "/groups/:groupId/meetings/:meetingId/users/:userId/comments/:commentId",
    [authJwt.verifyToken, verifyGroup.checkValidMember],
    readComment
  );

  app.put(
    "/groups/:groupId/meetings/:meetingId/users/:userId/comments/:commentId",
    [authJwt.verifyToken, verifyGroup.checkValidWriter],
    updateComment
  );

  app.delete(
    "/groups/:groupId/meetings/:meetingId/users/:userId/comments/:commentId",
    [authJwt.verifyToken, verifyGroup.checkValidWriter],
    deleteComment
  );
};
