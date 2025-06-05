export async function fetchBookings() {
  const res = await fetch("http://localhost:9000/reservations");
  return res.json();
}

export async function deleteReservation(id) {
  const res = await fetch(`http://localhost:9000/reservations/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// export async function createBooking(data) {
//   const res = await fetch('http://localhost:9000/reservations', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   });
//   return res.json();
// }
