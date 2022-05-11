export default {
  HOST: "buzzy-db.cs8xxdwyxmzt.ap-northeast-2.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "dQNyUsogNb5s65h1Te3y",
  DB: "buzzyDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
