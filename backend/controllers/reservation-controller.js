const Reservation = require("../models/Reservation");
const mongoose = require('mongoose');

async function addReservationHandler(req, h) {
  const { name, gender, phone, city, country, checkIn, checkOut, roomType, roomPrice } =
    req.payload;

  if (!name || !phone || !checkIn || !checkOut || !roomType || roomPrice === undefined) {
    return h.response({
      status: "fail",
      message: "Gagal menambahkan reservasi. Mohon isi semua field wajib: name, phone, checkIn, checkOut, roomType, roomPrice.",
    }).code(400);
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return h.response({
        status: "fail",
        message: "Format tanggal checkIn atau checkOut tidak valid.",
    }).code(400);
  }

  if (checkInDate >= checkOutDate) {
    return h.response({
      status: "fail",
      message: "Tanggal check-in harus sebelum tanggal check-out.",
    }).code(400);
  }

  try {
    const newReservation = new Reservation({
      name,
      gender,
      phone,
      city,
      country,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      roomType,
      roomPrice,
    });

    await newReservation.save();

    return h.response({
      status: "success",
      message: "Reservasi berhasil ditambahkan",
      data: {
        reservationId: newReservation._id
      }
    }).code(201);

  } catch (err) {
    if (err.name === 'ValidationError') {
      let validationMessages = "Data reservasi tidak valid.";
      if (err.errors) {
        validationMessages = Object.values(err.errors).map(e => e.message).join(', ');
      }
      return h.response({
        status: "fail",
        message: validationMessages,
      }).code(400);
    }
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat menambahkan reservasi.",
    }).code(500);
  }
}

async function getAllReservationsHandler(req, h) {
  try {
    const reservations = await Reservation.find({})
      .sort({ createdAt: -1 });

    return h.response({
      status: "success",
      data: {
        reservations: reservations,
      },
    }).code(200);

  } catch (err) {
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat mengambil data reservasi.",
    }).code(500);
  }
}

async function deleteReservationByIdHandler(req, h) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return h.response({
          status: "fail",
          message: "ID reservasi tidak valid.",
      }).code(400);
  }

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return h.response({
        status: "fail",
        message: "Data reservasi gagal dihapus. Id tidak ditemukan.",
      }).code(404);
    }

    return h.response({
      status: "success",
      message: "Reservasi berhasil dihapus.",
    }).code(200);

  } catch (err) {
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat menghapus reservasi.",
    }).code(500);
  }
}

module.exports = {
  addReservationHandler,
  getAllReservationsHandler,
  deleteReservationByIdHandler,
};