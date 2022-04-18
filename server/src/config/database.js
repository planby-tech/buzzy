import { Sequelize } from "sequelize";

const sequelize = new Sequelize("loginDB", "root", "planby0916", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
