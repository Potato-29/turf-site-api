const responseHelper = require("../helpers/http-responses");
const Schedule = require("../models/schedule.model");
const mongoose = require("mongoose");
const {
  getAllBookings,
  getBookingsById,
  insertBooking,
  updateBooking,
  removeBooking,
} = require("../services/bookings.service");
const { updateSchedule } = require("../services/schedule.service");

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
    const { schedule_id, slot_id } = req.body;
    try {
      const schedule = await Schedule.findOne({
        _id: req.body.schedule_id,
        "slots._id": req.body.slot_id[0],
      });
      if (!schedule) {
        responseHelper.serverError(res, "Schedule not found!", null);
        return;
      }

      const { is_booked } = schedule.slots.find(
        (slot) => slot._id.toString() === slot_id[0]
      );

      if (is_booked) {
        responseHelper.serverError(res, "Slot already booked!", null);
        return;
      }

      const updateSlot = await Schedule.updateOne(
        {
          _id: schedule_id,
          "slots._id": slot_id[0],
        },
        { $set: { "slots.$.is_booked": true } }
      );

      if (!updateSlot.acknowledged) {
        responseHelper.serverError(res, "Failed to book!", null);
        return;
      }

      const booking = await insertBooking(req.body);
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
