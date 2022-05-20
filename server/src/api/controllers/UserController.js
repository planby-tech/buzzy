import UserService from "../../services/UserService.js";
import jwt from "jsonwebtoken";
import db from "../../db/models/index.js";
import config from "../../configs/auth.config.js";

const updateUser = (req, res) => {
  const userDTO = req.body;
  const id = req.userId;
  const user = new UserService()
    .updateUser(id, userDTO)
    .then((user) => {
      return res.json({ user: user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const User = db.User;
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
      User.destroy({ where: { id: req.userId } });
      res.send({ message: "User was deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteAllUsers = (req, res) => {
  const User = db.User;
  User.destroy({
    where: {},
    truncate: false,
  })
    .then(res.send({ message: "All users were deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const findByUser = (req, res) => {
  const UserGroup = db.UserGroup;
  const Group = db.Group;

  UserGroup.findAll({
    where: { userId: req.userId },
  })
    .then((userGroups) => {
      Promise.all(
        userGroups.map((userGroup) => {
          return new Promise((resolve) => {
            Group.findOne({
              where: { id: userGroup.groupId },
            }).then((group) => {
              resolve(group);
            });
          });
        })
      ).then((groups) => {
        res.send(groups);
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export { updateUser, deleteUser, deleteAllUsers, findByUser };
