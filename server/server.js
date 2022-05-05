import express from "express";
import cors from "cors";
import authRouter from "./src/api/routes/auth.routes.js";
import userRouter from "./src/api/routes/user.routes.js";
import groupRouter from "./src/api/routes/group.routes.js";
import db from "./src/models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;
let corsOptions = {
  origin: "http://192.168.219.104:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to planby application." });
});

// routes
authRouter(app);
userRouter(app);
groupRouter(app);

// initialize db
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB");
//   initial();
// });
db.sequelize.sync();

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
