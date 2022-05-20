import UserService from "../../services/UserService.js";

const user = new UserService();

const updateUser = (req, res) => {
  const userDTO = req.body;
  const userId = req.userId;
  user
    .updateUser(userId, userDTO)
    .then((user) => {
      res.json({
        message: "User was updated successfully!",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteUser = (req, res) => {
  const userId = req.userId;
  user
    .deleteUser(userId)
    .then((user) => {
      res.json({
        message: "User was deleted successfully!",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteAllUsers = (req, res) => {
  user
    .deleteAllUsers()
    .then(res.json({ message: "All users were deleted successfully!" }))
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findGroups = (req, res) => {
  const userId = req.userId;
  user
    .findGroups(userId)
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { updateUser, deleteUser, deleteAllUsers, findGroups };
