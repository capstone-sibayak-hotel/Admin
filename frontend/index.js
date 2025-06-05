// style
import './assets/styles/styles.css';

// components
import './assets/components/sidebar.js';
import './assets/components/topbar-component.js';
import './assets/components/stat-card.js';
import './assets/components/percentage-bar.js'
import './assets/components/reservation-data.js';
import { renderHomeCards } from './dom/renderHomeCards.js';
import renderReservations from './dom/renderReservations.js';
import renderRoomData from './dom/renderRoomData.js';


// Page-specific logic
if (window.location.pathname.endsWith('index.html') && window.location.pathname.includes('admin')) {
  await renderHomeCards();
}
if (window.location.pathname.endsWith('reservation-data.html') && window.location.pathname.includes('admin')) {
  await renderReservations();
}
if (window.location.pathname.endsWith('room-data.html') && window.location.pathname.includes('admin')) {
  await renderRoomData();
}

// if (window.location.pathname.endsWith('review.html')) {
//   document.addEventListener('review-submitted', (e) => {
//     const reviewData = e.detail;
//     // Handle review submission (e.g., send to API)
//     console.log('Review data:', reviewData);
//   });
// }