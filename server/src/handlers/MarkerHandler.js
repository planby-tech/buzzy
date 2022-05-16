export default (io, socket) => {
  const createMarker = (payload) => {};

  const loadMarker = (markerId, callback) => {};

  socket.on("marker:create", createMarker);
  socket.on("marker:load", loadMarker);
};
