import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import Role from "../../models/Role.js";
import config from "../../configs/auth.config.js";

const signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          name: req.body.name,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export { signup, login };

// const signup = (req, res, next) => {
//   // checks if email already exists
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((dbUser) => {
//       if (dbUser) {
//         return res.status(409).json({ message: "email already exists" });
//       } else if (!userValidCheck(req)) {
//         return userValidMsg(req, res);
//       } else {
//         // hash password
//         bcrypt.hash(req.body.password1, 12, (err, passwordHash) => {
//           if (err) {
//             return res
//               .status(500)
//               .json({ message: "could not hash the password" });
//           } else if (passwordHash) {
//             return User.create({
//               email: req.body.email,
//               name: req.body.name,
//               password: passwordHash,
//             })
//               .then(() => {
//                 res.status(200).json({ message: "user created" });
//               })
//               .catch((err) => {
//                 console.log(err);
//                 res
//                   .status(502)
//                   .json({ message: "error while creating the user" });
//               });
//           }
//         });
//       }
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// };

// const login = (req, res, next) => {
//   // checks if email exists
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((dbUser) => {
//       if (!dbUser) {
//         return res.status(404).json({ message: "user not found" });
//       } else {
//         // password hash
//         bcrypt.compare(
//           req.body.password,
//           dbUser.password,
//           (err, compareRes) => {
//             if (err) {
//               // error while comparing
//               res
//                 .status(502)
//                 .json({ message: "error while checking user password" });
//             } else if (compareRes) {
//               // password match
//               const token = jwt.sign({ email: req.body.email }, "secret", {
//                 expiresIn: "1h",
//               });
//               res.status(200).json({ message: "user logged in", token: token });
//             } else {
//               // password doesn't match
//               res.status(401).json({ message: "invalid credentials" });
//             }
//           }
//         );
//       }
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// };

// const isAuth = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     return res.status(401).json({ message: "not authenticated" });
//   }
//   const token = authHeader.split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, "secret");
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: err.message || "could not decode the token" });
//   }
//   if (!decodedToken) {
//     res.status(401).json({ message: "unauthorized" });
//   } else {
//     res.status(200).json({ message: "here is your resource" });
//   }
// };

// export { signup, login, isAuth };
