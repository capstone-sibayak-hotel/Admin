const { registerAdminHandler, loginAdminHandler } = require("./controllers/auth/auth-controller");
const {
  addReservationHandler,
  getAllReservationsHandler,
  deleteReservationByIdHandler,
} = require("./controllers/reservation-controller");
const {
  getAllRoomsHandler,
  updateRoomByIdHandler,
} = require("./controllers/rooom-controller");

const routes = [
  // Auth Routes
  {
    method:"POST",
    path:"/register",
    handler:registerAdminHandler
  },
  {
    method:"POST",
    path:"/login",
    handler:loginAdminHandler
  },
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
    handler: addReservationHandler,
    options: { auth: "jwt" },
  },
  {
    method: "GET",
    path: "/reservations",
    handler: getAllReservationsHandler,
    options: { auth: "jwt" },
  },
  {
    method: "DELETE",
    path: "/reservations/{id}",
    handler: deleteReservationByIdHandler,
    options: { auth: "jwt" },
  },

  // ROOMS
  {
    method: "GET",
    path: "/rooms",
    handler: getAllRoomsHandler,
    options: { auth: "jwt" },
  },
  {
    method: "PUT",
    path: "/rooms/{roomNumber}",
    handler: updateRoomByIdHandler,
    options: { auth: "jwt" },
  },
];

module.exports = routes;
