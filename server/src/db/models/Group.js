"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: "UserGroup",
        as: "User",
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      userNumber: DataTypes.INTEGER,
      groupCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
