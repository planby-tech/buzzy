import markerHandler from "../handlers/MarkerHandler.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("User connected!");
    markerHandler(io, socket);
  });
};
