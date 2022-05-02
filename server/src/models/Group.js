export default (sequelize, Sequelize) => {
  const Group = sequelize.define("groups", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    creator: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    userNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groupCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Group;
};
