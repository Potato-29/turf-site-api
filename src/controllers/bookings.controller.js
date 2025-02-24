const responseHelper = require("../helpers/http-responses");

const {
  getAllBookings,
  getBookingsById,
  insertBooking,
  updateBooking,
  removeBooking,
} = require("../services/bookings.service");

module.exports = {
  GetAll: async (req, res, next) => {
    try {
      responseHelper.success(res, "Success", null);
    } catch (error) {
      next(error);
    }
  },

  GetById: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Success", null);
    } catch (error) {
      next(error);
    }
  },

  CreateBooking: async (req, res, next) => {
    try {
      const booking = await insertBooking(req.body);
      console.log(booking);
      if (booking) {
        responseHelper.created(res, "Created successfully", null);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  Update: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Updated successfully", null);
    } catch (error) {
      next(error);
    }
  },

  Delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Deleted successfully", null);
    } catch (error) {
      next(error);
    }
  },
};
