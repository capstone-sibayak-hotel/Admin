import { API_URL } from '../config.js'; 

export async function fetchRooms(token) {
  const res = await fetch(`${API_URL}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    },
  });
  return res.json();
}

export async function updateRoomData(roomNumber, data, token) {
  const res = await fetch(`${API_URL}/rooms/${roomNumber}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
