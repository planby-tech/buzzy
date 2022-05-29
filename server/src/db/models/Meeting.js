"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Meeting extends Model {
    static associate(models) {
      models.Meeting.belongsTo(models.Group);
      models.Meeting.belongsToMany(models.Activity, {
        through: "MeetingActivities",
        as: "activities",
        foreignKey: "meetingId",
      });
      models.Meeting.hasMany(models.User);
      models.Meeting.hasMany(models.Place);
    }
  }
  Meeting.init(
    {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      allDay: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
