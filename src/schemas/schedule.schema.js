const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  date: Date,
  day: String,
  slotDuration: Number,
  operatingHours: {
    start: String,
    end: String,
  },
  slots: [
    {
      slot: String,
      start_time: String,
      end_time: String,
      is_booked: Boolean,
      slot_id: String,
    },
  ],
  turf_id: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ScheduleSchema;
