// const json = ```
//   "development": {
//     "username": "admin",
//     "password": "dQNyUsogNb5s65h1Te3y",
//     "database": "database_development",
//     "host": "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "admin",
//     "password": "dQNyUsogNb5s65h1Te3y",
//     "database": "database_test",
//     "host": "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "admin",
//     "password": "dQNyUsogNb5s65h1Te3y",
//     "database": "database_production",
//     "host": "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
//     "dialect": "mysql"
//   }
// ```;

const development = {
  username: "admin",
  password: "dQNyUsogNb5s65h1Te3y",
  database: "database_development",
  host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
};
const test = {
  username: "admin",
  password: "dQNyUsogNb5s65h1Te3y",
  database: "database_test",
  host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
};
const production = {
  username: "admin",
  password: "dQNyUsogNb5s65h1Te3y",
  database: "database_production",
  host: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
};

const database = {
  development: development,
  test: test,
  production: production,
};

export default database;
