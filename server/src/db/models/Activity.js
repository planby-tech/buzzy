"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      models.Activity.belongsToMany(models.Meeting, {
        through: "MeetingActivities",
        as: "meetings",
        foreignKey: "activityId",
      });
    }
  }
  Activity.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
