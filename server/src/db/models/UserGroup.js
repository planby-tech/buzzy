"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate(models) {}
  }
  UserGroup.init(
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGroup",
    }
  );
  return UserGroup;
};
