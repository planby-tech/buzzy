"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      models.Image.belongsTo(models.Post, {
        foreignKey: "postId",
      });
      models.Image.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
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
