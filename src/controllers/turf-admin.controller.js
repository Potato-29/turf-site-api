const responseHelper = require("../helpers/http-responses");
const hashPassword = require("../helpers/password-hasher");
const {
  createTurfAdmin,
  getTurfAdminByEmail,
} = require("../services/turf-admin.service");
const { createTurf } = require("../services/turf.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  LoginTurfAdmin: async (req, res, next) => {
    try {
      const turfadmin = await getTurfAdminByEmail(req.body.email);

      if (turfadmin.length === 0) {
        responseHelper.badRequest(res, "No user found by that email!", null);
        return;
      }
      const isPasswordValid = await bcrypt.compareSync(
        req.body.password,
        turfadmin[0].password
      );

      if (!isPasswordValid) {
        responseHelper.badRequest(res, "Invalid Password!", null);
        return;
      }

      const { full_name, email, turf_id, created_at, phone_number, _id } =
        turfadmin[0];

      const token = jwt.sign(
        { full_name, email, turf_id, created_at, phone_number, _id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      responseHelper.success(res, "Success", token);
    } catch (error) {
      next(error);
    }
  },

  RegisterTurfAdmin: async (req, res, next) => {
    try {
      const newTurf = await createTurf();
      console.log("added turf", newTurf);
      if (!newTurf) {
        responseHelper.badRequest(res, "Something went wrong!", null);
      }

      const hashedPassword = await hashPassword(req.body.password);
      const turfAdmin = await createTurfAdmin({
        ...req.body,
        password: hashedPassword,
        turf_id: newTurf._id,
      });
      console.log("added admin", turfAdmin);
      if (turfAdmin) {
        responseHelper.created(res, "Created successfully", null);
      }
    } catch (error) {
      next(error);
    }
  },

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
