const Booking = require("../models/bookings.model");

const getAllBookings = async () => {
  return await Booking.find();
};

const getBookingsById = async (id) => {
  return await Booking.findById(id);
};

const insertBooking = async (data, session) => {
  const newbookings = new Booking(data);
  return await newbookings.save({ session });
};

const updateBooking = async (id, data) => {
  return await Booking.findByIdAndUpdate(id, data, { new: true });
};

const removeBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

module.exports = {
  getAllBookings,
  getBookingsById,
  insertBooking,
  updateBooking,
  removeBooking,
};
