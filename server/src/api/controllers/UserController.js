import UserService from "../../services/UserService.js";

const user = new UserService();

const readUser = (req, res) => {
  const userId = req.params.userId;
  user
    .readUser(userId)
    .then((user) => {
      res.json({
        message: "User information",
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateUser = (req, res) => {
  const userId = req.params.userId;
  const userDTO = req.body;
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
  const userId = req.params.userId;
  user
    .deleteUser(userId)
    .then(() => {
      res.json({
        message: "User was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const joinGroup = (req, res) => {
  const userId = req.params.userId;
  const groupCode = req.body.groupCode;
  user
    .joinGroup(userId, groupCode)
    .then((group) => {
      res.json({
        message: "User was joined to group successfully!",
        group: group,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findGroups = (req, res) => {
  const userId = req.params.userId;
  user
    .findGroups(userId)
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findMeetings = (req, res) => {
  const userId = req.params.userId;
  user
    .findMeetings(userId)
    .then((meetings) => {
      res.json(meetings);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export {
  readUser,
  updateUser,
  deleteUser,
  joinGroup,
  findGroups,
  findMeetings,
};
