import { fetchBookings } from "../api/reservation";

const reservationContainer = document.getElementById("reservation-container");

export default async function renderReservations() {
  const bookingResponse = await fetchBookings();
  const reservations = bookingResponse.data.reservations;

  if (!reservations || !Array.isArray(reservations)) {
    console.error("Failed to fetch or parse reservations.", bookingResponse);
    reservationContainer.innerHTML = "<p>Could not load reservations.</p>"; // Or some other error message
    return;
  }

  const reservationsHtml = reservations.reduce((html, reservation) => {
    const {
      id,
      name,
      gender,
      phone,
      city,
      country,
      roomType,
      checkIn,
      checkOut,
      createdAt,
    } = reservation;

    // Create the objects to be stringified
    const roomInfoData = {
      id,
      roomType,
      checkIn,
      checkOut,
      added: createdAt, // 'added' will map to createdAt
    };

    const customerInfoData = {
      name,
      gender,
      phone,
      city,
      country,
    };


    return (
      html +
      `
      <reservation-data
        roomInfo='${JSON.stringify(roomInfoData)}'
        customerInfo='${JSON.stringify(customerInfoData)}'
      >
      </reservation-data>
    `
    );
  }, "");

  reservationContainer.innerHTML = reservationsHtml;
}