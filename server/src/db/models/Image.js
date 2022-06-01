"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      models.Image.belongsTo(models.Post);
      models.Image.belongsTo(models.Group);
    }
  }
  Image.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
