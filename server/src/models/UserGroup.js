import { Sequelize } from "sequelize";
import sequelize from "../utils/Database.js";

const UserGroup = sequelize.define(
  "userGroups",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default UserGroup;
