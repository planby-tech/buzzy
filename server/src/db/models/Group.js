"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      models.Group.belongsToMany(models.User, {
        through: "UserGroups",
        as: "users",
        foreignKey: "groupId",
      });
      // models.Group.hasMany(models.UserGroup);
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
