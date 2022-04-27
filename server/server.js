const express = require("express");
const cors = require("cors");
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

const db = require("./src/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// routes
require("./src/api/routes/auth.routes")(app);
require("./src/api/routes/user.routes")(app);

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

// import express from "express";
// import cors from "cors";
// import Sequelize from "sequelize";
// import { router as authRouter } from "./src/api/routes/auth.routes.js";
// import { router as userRouter } from "./src/api/routes/user.routes.js";
// import db from "./src/models/index.js";

// const app = express();
// const PORT = 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
// app.use(authRouter);
// app.use(userRouter);

// app.use((_, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// const Role = db.roles.Role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB");
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "moderator",
//   });
//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

// app.listen(PORT);
