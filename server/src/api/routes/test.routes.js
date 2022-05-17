import db from "../../db/models/index.js";

export default (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user", async (req, res) => {
    const User = db.User;
    const user = await User.findOne({
      where: {
        email: "heonsub6558@gmail.com",
      },
    });
    return res.json({ user: user });
  });
};
