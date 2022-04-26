import crypto from "crypto";
import Group from "../../models/Group.js";

const createGroup = (req, res, next) => {
  if (!groupValidCheck(req)) {
    return groupValidMsq(req, res);
  } else {
    return Group.create({
      name: req.body.name,
      description: req.body.description,
      userNumber: 1,
      groupCode: crypto.randomUUID(),
    })
      .then(() => {
        res.status(200).json({ message: "group created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(502).json({ message: "error while creating the croup" });
      });
  }
};

export { createGroup };
