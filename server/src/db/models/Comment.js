"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.Post, {
        foreignKey: "postId",
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
