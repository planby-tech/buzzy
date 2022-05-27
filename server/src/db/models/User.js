"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Group, {
        through: "UserGroups",
        as: "groups",
        foreignKey: "userId",
      });
      // models.User.hasMany(models.UserGroup);
      models.User.hasMany(models.Role);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
