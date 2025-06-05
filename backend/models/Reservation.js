const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Other', 'Prefer not to say'],
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
    
  },
  country: {
    type: String,
    trim: true
   
  },
  roomType: {
    type: String,
    required: true,
    trim: true,
    enum: ['Deluxe', 'Executive', 'Family']
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  roomPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Optional: Custom validator to ensure checkOut date is after checkIn date
reservationSchema.pre('save', function(next) {
  if (this.checkOut <= this.checkIn) {
    next(new Error('Check-out date must be after check-in date'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);