import authJwt from "../middleware/AuthJwt.js";
import {
  generateQuestion,
  removeQuestion,
} from "../controllers/QuestionController.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/meetings/:meetingId/users/:userId/questions",
    [authJwt.verifyToken],
    generateQuestion
  );

  app.delete(
    "/meetings/:meetingId/users/:userId/questions/:questionId",
    removeQuestion
  );
};
