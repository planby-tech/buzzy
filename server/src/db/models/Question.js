"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      models.Question.belongsToMany(models.Post, {
        through: "PostQuestions",
        as: "posts",
        foreignKey: "questionId",
      });
      models.Question.hasMany(models.Answer, {
        foreignKey: "questionId",
      });
      models.Question.belongsToMany(models.Meeting, {
        through: "MeetingQuestions",
        as: "meetings",
        foreignKey: "questionId",
      });
    }
  }
  Question.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
