import authJwt from "../../middleware/AuthJwt.js";
import verifyGroup from "../../middleware/VerifyGroup.js";
import {
  createGroup,
  joinGroup,
  findByGroup,
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

  app.post(
    "/api/group/join",
    [authJwt.verifyToken, verifyGroup.checkValidGroup],
    joinGroup
  );

  app.get("/api/group/findUsers", [authJwt.verifyToken], findByGroup);
};
