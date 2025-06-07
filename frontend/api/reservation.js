import { API_URL } from '../config.js';  

export async function fetchBookings(token) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    }
  });
  return res.json();
}

export async function deleteReservation(id, token) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,  
    },
  });
  return res.json();
}
