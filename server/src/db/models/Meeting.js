"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meeting.init(
    {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
