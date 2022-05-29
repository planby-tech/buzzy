import db from "../../db/models/index.js";

const checkValidMember = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.userId,
    },
    include: {
      model: db.Group,
      through: "UserGroups",
      as: "groups",
      attributes: ["id"],
    },
  })
    .then((user) => {
      for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i].id.toString() === req.params.groupId) return next();
      }
      res.status(401).send("This user is not allowed to access group!!");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const verifyGroup = {
  checkValidMember: checkValidMember,
};

export default verifyGroup;
