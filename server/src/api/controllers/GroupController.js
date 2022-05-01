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
    userNumber: 1,
    groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
  })
    .then((group) => {
      const user = await User.findByPk(req.userId)
      group.addUser(user, { through: { selfGranted: false } });
      res.send({ message: "Group was created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const joinGroup = (req, res) => {
  return;
};

export { createGroup, joinGroup };
