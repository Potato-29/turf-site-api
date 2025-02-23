const mongoose = require("mongoose");

const TurfAdminSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone_number: String,
  password: String,
  turf_id: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = TurfAdminSchema;
