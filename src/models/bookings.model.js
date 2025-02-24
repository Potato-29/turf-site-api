const mongoose = require("mongoose");
const bookingsSchema = require("../schemas/bookings.schema");

const Booking = mongoose.model("booking", bookingsSchema);

module.exports = Booking;
