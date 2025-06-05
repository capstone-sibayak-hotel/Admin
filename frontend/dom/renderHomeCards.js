import { fetchBookings } from "../api/reservation";
import { fetchRooms } from "../api/room";

export async function renderHomeCards() {
  const cardsContainer = document.querySelector(".cards-container");

  const bookingsRes = await fetchBookings();
  const bookings = bookingsRes.data.reservations;
  console.log(bookings);

  cardsContainer.innerHTML = `
  <stat-card value=${bookings.length} label="New Booking"></stat-card>
  <stat-card value=300 label="Total Guest"></stat-card>
`;

  await renderPercentageBar();
}

async function renderPercentageBar() {
  const rooms = (await fetchRooms()).data.roomsData;

  // Get total and booked for each room type
  const deluxeTotal = rooms.filter(
    (r) => r.roomType.toLowerCase() === "deluxe"
  ).length;
  const deluxeBooked = rooms.filter(
    (r) => r.roomType.toLowerCase() === "deluxe" && r.isBooked
  ).length;

  const familyTotal = rooms.filter(
    (r) => r.roomType.toLowerCase() === "family"
  ).length;
  const familyBooked = rooms.filter(
    (r) => r.roomType.toLowerCase() === "family" && r.isBooked
  ).length;

  const executiveTotal = rooms.filter(
    (r) => r.roomType.toLowerCase() === "executive"
  ).length;
  const executiveBooked = rooms.filter(
    (r) => r.roomType.toLowerCase() === "executive" && r.isBooked
  ).length;

  // Calculate percentages, also avoid division by zero >_0
  const deluxePercentage = deluxeTotal ? (deluxeBooked / deluxeTotal) * 100 : 0;
  const familyPercentage = familyTotal ? (familyBooked / familyTotal) * 100 : 0;
  const executivePercentage = executiveTotal
    ? (executiveBooked / executiveTotal) * 100
    : 0;

  document.getElementById("top-room-bars-container").innerHTML = `
    <percentage-bar value="${deluxePercentage}" label="Deluxe Rooms"></percentage-bar>
    <percentage-bar value="${familyPercentage}" label="Family Rooms"></percentage-bar>
    <percentage-bar value="${executivePercentage}" label="Executive Suite"></percentage-bar>
  `;
}
