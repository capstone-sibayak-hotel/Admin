export async function fetchRooms() {
  const res = await fetch('http://localhost:9000/rooms');
  return res.json();
}


export async function updateRoomData(data, roomNumber) {
  const res = await fetch(`http://localhost:9000/rooms/${roomNumber}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}