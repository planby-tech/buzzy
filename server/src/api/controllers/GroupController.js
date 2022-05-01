import crypto from "crypto";
import db from "../../models/index.js";

const User = db.user;
const Group = db.group;
const Op = db.Sequelize.Op;

const createGroup = (req, res) => {
  Group.create({
    name: req.body.name,
    creater: req.userId,
    description: req.body.description,
    groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
  })
    .then((group) => {
      group.setUserNumber(1).then(() => {
        res.send({ message: "Group was created successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const joinGroup = (req, res) => {
  return null;
};

export { createGroup, joinGroup };
