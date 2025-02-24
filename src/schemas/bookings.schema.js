const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  turf_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  schedule_id: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  slot_id: {
    type: [String],
    required: true,
  },
  turf_admin_id: {
    type: String,
    required: true,
  },
  booking_date: {
    type: Date,
  },
  payment_method: {
    type: String,
  },
  turf_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = bookingsSchema;
