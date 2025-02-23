const responseHelper = require("../helpers/http-responses");
const Turf = require("../models/turf.model");
const {
  getAll,
  createTurf,
  getById,
  updateTurf,
} = require("../services/turf.service");

module.exports = {
  GetAllTurfs: async (req, res, next) => {
    try {
      const turfs = await getAll();
      const docs = await Turf.countDocuments();
      console.log(turfs, docs);
      if (turfs) {
        responseHelper.success(res, "Success", turfs);
      }
    } catch (error) {
      next(error);
    }
  },

  GetById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const turf = await getById(id);

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

  Delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Deleted successfully", null);
    } catch (error) {
      next(error);
    }
  },
};
