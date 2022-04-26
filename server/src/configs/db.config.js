const config = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "planby0916",
  DB: "loginDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
