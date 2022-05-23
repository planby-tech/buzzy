"use strict";

import { readdirSync } from "fs";
import { basename, dirname } from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
import database from "../config/database.js";
import User from "./User.js";
import Group from "./Group.js";
import Role from "./Role.js";
import Marker from "./Marker.js";
import UserGroup from "./UserGroup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
const sequelize = new Sequelize(database.development);

export default (() => {
  const db = {};
  const files = readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename(__filename) &&
        file.slice(-3) === ".js"
    )
    .forEach((file) => {
      const model = import(`./${file}`).then((model) => {
        const namedModel = model.default(sequelize, Sequelize.DataTypes);
        db[namedModel.name] = namedModel;
      });
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      console.log("associate!!");
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // db.User = User(sequelize, Sequelize);
  // db.Group = Group(sequelize, Sequelize);
  // db.Role = Role(sequelize, Sequelize);
  // db.Marker = Marker(sequelize, Sequelize);
  // db.UserGroup = UserGroup(sequelize, Sequelize);

  // db.User.associate(db);
  // db.Group.associate(db);
  // db.Role.associate(db);

  return db;
})();

// "use strict";

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/database.json")[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// "use strict";

// import fs from "fs";
// import path from "path";
// import Sequelize from "sequelize";
// import { fileURLToPath } from "url";
// import { development } from "../config/database.js";
// import User from "../models/User.js";
// import Group from "../models/Group.js";
// import Role from "../models/Role.js";
// import UserGroup from "../models/UserGroup.js";
// import Marker from "../models/Marker.js";

// const __filename = fileURLToPath(import.meta.url);
// const basename = path.basename(__filename);
// const __dirname = path.dirname(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = development;

// const db = {};

// let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(async (file) => {
//     const model = await import(`./${file}`);
//     const nameModel = model.default(sequelize, Sequelize.DataTypes);
//     db[nameModel.name] = nameModel;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.User = User(sequelize, Sequelize.DataTypes);
// db.Group = Group(sequelize, Sequelize.DataTypes);
// db.Role = Role(sequelize, Sequelize.DataTypes);
// db.UserGroup = UserGroup(sequelize, Sequelize.DataTypes);
// db.Marker = Marker(sequelize, Sequelize.DataTypes);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

// ====== database.js ======
// const development = {
//   username: "admin",
//   password: "dQNyUsogNb5s65h1Te3y",
//   database: "database_development",
//   host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//   dialect: "mysql",
// };
// const test = {
//   username: "admin",
//   password: "dQNyUsogNb5s65h1Te3y",
//   database: "database_test",
//   host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//   dialect: "mysql",
// };
// const production = {
//   username: "admin",
//   password: "dQNyUsogNb5s65h1Te3y",
//   database: "database_production",
//   host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//   dialect: "mysql",
// };

// const database = {
//   development: development,
//   test: test,
//   production: production,
// };

// export default database;

/*
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT
Sequelize.CITEXT                      // CITEXT      PostgreSQL and SQLite only.

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 10)               // FLOAT(11,10)

Sequelize.REAL                        // REAL        PostgreSQL only.
Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 10)              // DOUBLE(11,10)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
Sequelize.ARRAY(Sequelize.ENUM)       // Defines an array of ENUM. PostgreSQL only.

Sequelize.JSON                        // JSON column. PostgreSQL, SQLite and MySQL only.
Sequelize.JSONB                       // JSONB column. PostgreSQL only.

Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

Sequelize.CIDR                        // CIDR datatype for PostgreSQL
Sequelize.INET                        // INET datatype for PostgreSQL
Sequelize.MACADDR                     // MACADDR datatype for PostgreSQL

Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type. PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
*/

/*

- Meeting -
title
description
date
place
photo
content
groupId
commentId

- Comment -
description
userId
groupId
meetingId

*/
