import express from "express";
import cors from "cors";
import authRouter from "./src/api/routes/auth.routes.js";
import userRouter from "./src/api/routes/user.routes.js";
import db from "./src/models/index.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// routes
app.use("/auth.routes", authRouter);
app.use("/user.routes", userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

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
