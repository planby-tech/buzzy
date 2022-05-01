import jwt from "jsonwebtoken";
import db from "../../models/index.js";
import config from "../../configs/auth.config.js";

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const updateUser = (req, res) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "User not found",
        });
      }
      if (!req.body.name) {
        res.status(400).send({ message: "Name is not provided" });
      } else {
        User.update({
          name: req.body.name,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "User not found",
        });
      }
      User.delete(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  updateUser,
  deleteUser,
};
