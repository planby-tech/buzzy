import config from "../configs/db.config.js";
import Sequelize from "sequelize";
import User from "./User.js";
import Role from "./Role.js";
import Group from "./Group.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);
db.group = Group(sequelize, Sequelize);

db.user.belongsToMany(
  (db.role,
  {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
  }),
  (db.group,
  {
    through: "user_groups",
    foreignKey: "userId",
    otherKey: "groupId",
  })
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.group.belongToMany(db.user, {
  through: "user_groups",
  foreignKey: "groupId",
  otherKey: "userId",
});

db.ROLES = ["user", "admin", "moderator"];

export default db;
