export default (sequelize, Sequelize) => {
  const Marker = sequelize.define("markers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    coord: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Marker;
};
