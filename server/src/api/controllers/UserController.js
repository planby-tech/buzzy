import UserService from "../../services/UserService.js";
import db from "../../db/models/index.js";

const user = new UserService();

const updateUser = (req, res) => {
  const userDTO = req.body;
  const id = req.userId;
  user
    .updateUser(id, userDTO)
    .then((user) => {
      return res.json({
        message: "User was updated successfully!",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const id = req.userId;
  user
    .deleteUser(id)
    .then((user) => {
      return res.json({
        message: "User was deleted successfully!",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteAllUsers = (req, res) => {
  user
    .deleteAllUsers()
    .then(res.json({ message: "All users were deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const findGroups = (req, res) => {
  const id = req.userId;
  user
    .findGroups(id)
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

export { updateUser, deleteUser, deleteAllUsers, findGroups };
