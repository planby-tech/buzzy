import markerHandler from "../handlers/MarkerHandler.js";

export default (app, io) => {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to planby application." });
  });

  io.on("connection", (socket) => {
    console.log("User connected!");
    markerHandler(io, socket);
  });
};
