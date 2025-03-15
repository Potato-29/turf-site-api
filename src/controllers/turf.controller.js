const responseHelper = require("../helpers/http-responses");
const Turf = require("../models/turf.model");
const {
  getAll,
  createTurf,
  getTurfById,
  updateTurf,
} = require("../services/turf.service");
const { getAllSchedules } = require("../services/schedule.service");

module.exports = {
  GetAllTurfs: async (req, res, next) => {
    try {
      const turfs = await getAll();
      const docs = await Turf.countDocuments();
      if (turfs) {
        responseHelper.success(res, "Success", turfs);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  GetAllTurfsByFilter: async (req, res, next) => {
    try {
      let { search, range, min_rating, sort_by, page, limit } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      let query = {
        filter: {},
        sort: {},
        skip: (page - 1) * limit || 0,
        limit: limit || 5,
      };
      if (search) {
        query.filter.name = { $regex: search, $options: "i" };
      }
      if (range) {
        query.filter["price.hourly"] = {
          $gte: parseInt(range.split(",")[0]),
          $lte: parseInt(range.split(",")[1]),
        };
      }
      if (parseInt(min_rating)) {
        query.filter.average_rating = { $gte: parseFloat(min_rating) };
      }
      if (sort_by) {
        if (sort_by === "rating") {
          query.sort = { $sort: { average_rating: -1 } };
        } else {
          query.sort = { $sort: { "price.hourly": -1 } };
        }
      }
      const turfs = await getAll(query);
      const docs = await Turf.countDocuments();
      const totalPages = Math.round(docs / limit);
      if (turfs) {
        let response = {
          turfs,
          totalPages,
          currentPage: page,
        };
        responseHelper.success(res, "Success", response);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  GetById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const turf = await getTurfById(id);

      responseHelper.success(res, "Success", turf);
    } catch (error) {
      next(error);
    }
  },

  CreateTurf: async (req, res, next) => {
    try {
      const newTurf = await createTurf(req.body);
      responseHelper.created(res, "Created successfully", null);
    } catch (error) {
      next(error);
    }
  },

  CompleteTurfOnboarding: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (id === undefined || id === "") {
        responseHelper.badRequest(res, "Turf id is necessary", null);
        return;
      }

      const updatedTurf = await updateTurf(id, req.body);

      if (!updatedTurf) {
        responseHelper.badRequest(
          res,
          "You're not registered properly, please contact the admin."
        );
        return;
      }
      if (updatedTurf) {
        responseHelper.success(
          res,
          "Onboarding finished successfully",
          updatedTurf
        );
        return;
      }
    } catch (error) {
      next(error);
    }
  },

  GetSchedulesByTurfId: async (req, res, next) => {
    try {
      const currentDate = new Date(
        new Date().setUTCHours(0, 0, 0, 0)
      ).toISOString();

      const id = req.params.id;
      const schedules = await getAllSchedules({
        turf_id: id,
        date: { $gte: currentDate },
      });
      responseHelper.success(res, "Success", schedules);
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
