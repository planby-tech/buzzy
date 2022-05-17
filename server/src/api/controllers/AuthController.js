import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../db/models/index.js";
import config from "../../configs/auth.config.js";

const signup = (req, res) => {
  const User = db.User;
  // const Role = db.Role;
  // const Op = db.Sequelize.Op;
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password1, 8),
    name: req.body.name,
  })
    .then(
      //   (user) => {
      //   if (req.body.roles) {
      //     Role.findAll({
      //       where: {
      //         name: {
      //           [Op.or]: req.body.roles,
      //         },
      //       },
      //     }).then((roles) => {
      //       user.setRoles(roles).then(() => {
      //         res.send({ message: "User was registered successfully!" });
      //       });
      //     });
      //   } else {
      //     user.setRoles([1]).then(() => {
      //       res.send({ message: "User was registered successfully!" });
      //     });
      //   }
      // }
      (user) => {
        res.json({ message: "User was registered successfully!", user: user });
      }
    )
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const login = (req, res) => {
  const User = db.User;
  // const Role = db.Role;
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60 * 60 * 24 * 50,
      });
      // let authorities = [];
      // user.getRoles().then((roles) => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      //   res.status(200).send({
      //     id: user.id,
      //     email: user.email,
      //     name: req.body.name,
      //     roles: authorities,
      //     accessToken: token,
      //   });
      // });
      res.status(200).send({
        id: user.id,
        email: user.email,
        name: req.body.name,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export { signup, login };
