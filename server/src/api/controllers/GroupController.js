import crypto from "crypto";
import db from "../../models/index.js";

const User = db.user;
const Group = db.group;
const UserGroup = db.userGroup;
const Op = db.Sequelize.Op;

const createGroup = (req, res) => {
  Group.create({
    name: req.body.name,
    description: req.body.description,
    userNumber: 1,
    groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
  })
    .then(async (group) => {
      await UserGroup.create({
        userId: req.userId,
        groupId: group.id,
      });
      res.send({ message: "Group was created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const joinGroup = (req, res) => {
  Group.findOne({
    where: { groupCode: req.body.groupCode },
    include: User,
  })
    .then(async (group) => {
      await UserGroup.create({
        userId: req.userId,
        groupId: group.id,
      });
      res.send({ message: "User was joined to group successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const findByGroup = (req, res) => {
  UserGroup.findOne(
    { where: { groupId: req.body.id } },
    {
      attributes: ["id"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    }
  )
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export { createGroup, joinGroup, findByGroup };
