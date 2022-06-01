"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.Meeting, {
        foreignKey: "meetingId",
      });
      models.Post.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      models.Post.belongsToMany(models.Question, {
        through: "PostQuestions",
        as: "questions",
        foreignKey: "postId",
      });
      models.Post.hasMany(models.Place, {
        foreignKey: "postId",
      });
      models.Post.hasMany(models.Answer, {
        foreignKey: "postId",
      });
      models.Post.hasMany(models.Image, {
        foreignKey: "postId",
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
