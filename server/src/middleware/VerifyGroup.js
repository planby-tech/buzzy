import db from "../models/index.js";

const UserGroup = db.user_group;

const checkValidCreator = (req, res, next) => {
  if (req.userId != req.body.creator) {
    return res.status(409).send({
      message: "This user is not allowed to change group",
    });
  }
  next();
};

const checkValidMember = (req, res, next) => {
  UserGroup.findOne({
    where: {
      userId: req.userId,
      groupId: req.body.id,
    },
  }).then((userGroup) => {
    if (!userGroup) {
      return res.status(409).send({
        message: "This user is not allowed to access group",
      });
    }
  });
  next();
};

const verifyGroup = {
  checkValidCreator: checkValidCreator,
  checkValidMember: checkValidMember,
};

export default verifyGroup;
