import crypto from "crypto";
import db from "../../db/models/index.js";

const createGroup = (req, res) => {
  const Group = db.Group;
  const UserGroup = db.UserGroup;

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
      res.send({ group, message: "Group was created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const joinGroup = (req, res) => {
  const Group = db.Group;
  const User = db.User;
  const UserGroup = db.UserGroup;

  Group.findOne({
    where: { groupCode: req.body.groupCode },
  })
    .then(async (group) => {
      if (!group) {
        return res.status(400).send({ message: "Group not found" });
      }
      await UserGroup.create({
        userId: req.userId,
        groupId: group.id,
      });
      group.increment("userNumber");
      res.send({ group, message: "User was joined to group successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const findUsers = (req, res) => {
  const UserGroup = db.UserGroup;
  const User = db.User;

  UserGroup.findAll({
    where: { groupId: req.groupId },
  })
    .then((userGroups) => {
      Promise.all(
        userGroups.map((userGroup) => {
          return new Promise((resolve) => {
            User.findOne({
              where: { id: userGroup.userId },
            }).then((user) => {
              resolve(user);
            });
          });
        })
      ).then((users) => {
        res.send(users);
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const updateGroup = (req, res) => {
  const Group = db.Group;
  Group.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((group) => {
      if (!group) {
        res.status(400).send({
          message: "Group not found",
        });
      }
      if (!req.body.name) {
        res.status(400).send({ message: "Group name is not provided" });
      } else {
        Group.update(req.body, {
          where: {
            name: req.body.name,
            description: req.body.description,
          },
        });
        res.send({ message: "Group was updated successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteGroup = (req, res) => {
  const Group = db.Group;
  Group.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((group) => {
      if (!group) {
        res.status(400).send({
          message: "Group not found",
        });
      }
      Group.destroy({ where: { id: req.body.id } });
      res.send({ message: "Group was deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export { createGroup, joinGroup, findUsers, updateGroup, deleteGroup };
