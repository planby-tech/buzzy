"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.belongsToMany(models.Group, {
      //   through: models.UserGroup,
      //   as: "groups",
      //   foreignKey: "userId",
      // });
      // User.hasMany(models.Role);
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
