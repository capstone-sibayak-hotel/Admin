const { addReservationHandler, getAllReservationsHandler, deleteReservationByIdHandler } = require("./controllers/reservation-controller");
const { getAllRoomsHandler, updateRoomByIdHandler } = require("./controllers/rooom-controller");


const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.redirect(`/reservations`);
    },
  },
  {
    method: "POST",
    path: "/reservations",
    handler:  addReservationHandler,
  },
  {
    method: "GET",
    path: "/reservations",
    handler: getAllReservationsHandler,
  },
  {
    method: "DELETE",
    path: "/reservations/{id}",
    handler: deleteReservationByIdHandler,
  },

  // ROOMS
  {
    method: "GET",
    path: "/rooms",
    handler: getAllRoomsHandler,
  },
  {
    method: "PUT",
    path: "/rooms/{roomNumber}",
    handler: updateRoomByIdHandler,
  },
];

module.exports = routes;
