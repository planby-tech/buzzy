module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Role;
};

// import Sequelize from "sequelize";
// import db from "./index.js";

// const Role = db.sequelize.define("roles", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     unique: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });

// export default Role;
