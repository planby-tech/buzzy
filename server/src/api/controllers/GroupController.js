import GroupService from "../../services/GroupService.js";

const group = new GroupService();

const createGroup = (req, res) => {
  const userId = req.userId;
  const groupDTO = req.body;
  group
    .createGroup(userId, groupDTO)
    .then((group) => {
      res.json({
        message: "Group was created successfully!",
        group: group,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const joinGroup = (req, res) => {
  const userId = req.userId;
  const groupCode = req.body.groupCode;
  group
    .joinGroup(userId, groupCode)
    .then((userGroup) => {
      res.json({
        message: "User was joined to group successfully!",
        userGroup: userGroup,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findUsers = (req, res) => {
  const groupId = req.groupId;
  group
    .findUsers(groupId)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateGroup = (req, res) => {
  const groupDTO = req.body;
  group
    .updateGroup(groupDTO)
    .then((group) => {
      res.json({
        message: "Group was updated successfully!",
        group: group,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteGroup = (req, res) => {
  const groupId = req.body.id;
  group
    .deleteGroup(groupId)
    .then((group) => {
      res.json({
        message: "Group was deleted successfully!",
        group: group,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { createGroup, joinGroup, findUsers, updateGroup, deleteGroup };
