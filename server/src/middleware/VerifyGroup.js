import db from "../models/index.js";

const Group = db.group;

const checkValidGroup = (req, res) => {
  if (!req.body.groupCode) {
    return res.status(400).send({ message: "Group code is not provided" });
  }
  Group.findOne({
    where: {
      groupCode: req.body.groupCode,
    },
  }).then((group) => {
    if (!group) {
      return res.status(400).send({ message: "Group not found" });
    }
    next();
  });
};

const verifyGroup = {
  checkValidGroup: checkValidGroup,
};

export default verifyGroup;
