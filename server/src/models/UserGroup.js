export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define("user_groups", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
    },
  });
  return UserGroup;
};
