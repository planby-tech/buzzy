import config from "../configs/db.config.js";
import Sequelize from "sequelize";
import User from "./User.js";
import Role from "./Role.js";
import Group from "./Group.js";
import UserGroup from "./UserGroup.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
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
db.user_groups = UserGroup(sequelize, Sequelize);

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.user.belongsToMany(db.group, {
  through: db.user_groups,
  foreignKey: "userId",
  otherKey: "groupId",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.group.belongsToMany(db.user, {
  through: db.user_groups,
  foreignKey: "groupId",
  otherKey: "userId",
});

db.user.hasMany(db.user_groups);
db.group.hasMany(db.user_groups);
db.user_groups.belongsTo(db.user, { foreignKey: "userId" });
db.user_groups.belongsTo(db.group, { foreignKey: "groupId" });

db.ROLES = ["user", "admin", "moderator"];

export default db;
