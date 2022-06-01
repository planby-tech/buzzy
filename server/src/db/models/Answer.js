"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      models.Answer.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.Answer.belongsTo(models.Post, {
        foreignKey: "postId",
      });
      models.Answer.belongsTo(models.Question, {
        foreignKey: "questionId",
      });
    }
  }
  Answer.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
