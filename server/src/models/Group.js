import { Sequelize } from "sequelize";
import sequelize from "../utils/Database.js";

const Group = sequelize.define(
  "groups",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    userNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groupCode: {
      type: Sequelize.STRING,
      allowNull: false,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Group;
