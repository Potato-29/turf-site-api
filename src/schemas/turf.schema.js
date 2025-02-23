const mongoose = require("mongoose");

const TurfSchema = new mongoose.Schema({
  created_at: {
    default: Date.now,
    type: Date,
  },
  name: String,
  address: String,
  capacity: Number,
  header_image: String,
  available_sports: [String],
  hours: {
    weekdays: String,
    weekends: String,
  },
  price: {
    hourly: Number,
  },
  googleMapsLink: String,
  paymentDetails: Object,
  isOnboardingComplete: { type: Boolean, default: false },
  contactInfo: {
    phone: String,
    email: String,
  },
  reviews: [
    {
      author: String,
      rating: Number,
      comment: String,
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  images: [String],
  average_rating: Number,
});

module.exports = TurfSchema;
