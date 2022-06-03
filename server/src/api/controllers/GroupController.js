import GroupService from "../../services/GroupService.js";

const group = new GroupService();

const createGroup = (req, res) => {
  const userId = req.params.userId;
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

const readGroup = (req, res) => {
  const groupId = req.params.groupId;
  group
    .readGroup(groupId)
    .then((group) => {
      res.json({
        message: "Group information",
        group: group,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateGroup = (req, res) => {
  const groupId = req.params.groupId;
  const groupDTO = req.body;
  group
    .updateGroup(groupId, groupDTO)
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
  const groupId = req.params.groupId;
  group
    .deleteGroup(groupId)
    .then(() => {
      res.json({
        message: "Group was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findUsers = (req, res) => {
  const groupId = req.params.groupId;
  group
    .findUsers(groupId)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const findMeetings = (req, res) => {
  const groupId = req.params.groupId;
  group
    .findMeetings(groupId)
    .then((meetings) => {
      res.json(meetings);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export {
  createGroup,
  readGroup,
  updateGroup,
  deleteGroup,
  findUsers,
  findMeetings,
};
