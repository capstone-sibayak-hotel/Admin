import './assets/styles/styles.css';

import './assets/components/sidebar.js';
import './assets/components/topbar-component.js';
import './assets/components/stat-card.js';
import './assets/components/percentage-bar.js';
import './assets/components/reservation-data.js';
import './assets/components/auth-component.js';

import { renderHomeCards } from './dom/renderHomeCards.js';
import renderReservations from './dom/renderReservations.js';
import renderRoomData from './dom/renderRoomData.js';

// Redirect user to login if no token is found and they are on an admin page
if (
  window.location.pathname.includes('/admin') &&
  !localStorage.getItem('token')
) {
  window.location.href = 'login-admin.html';
}

const path = window.location.pathname;

// Admin dashboard (home)
if (path.endsWith('index.html') && path.includes('/admin')) {
  renderHomeCards();
}

// Reservation Data page
else if (path.endsWith('reservation-data.html') && path.includes('/admin')) {
  renderReservations();
}

// Room Data page
else if (path.endsWith('room-data.html') && path.includes('/admin')) {
  renderRoomData();
}
