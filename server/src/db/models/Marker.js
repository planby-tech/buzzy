"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Marker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Marker.init(
    {
      name: DataTypes.STRING,
      coord: DataTypes.GEOMETRY,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Marker",
    }
  );
  return Marker;
};
