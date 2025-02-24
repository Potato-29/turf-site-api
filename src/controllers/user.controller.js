const responseHelper = require("../helpers/http-responses");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = require("../helpers/password-hasher");

const {
  getAll,
  getById,
  createUser,
  update,
  getUserByEmail,
  remove,
} = require("../services/user.service");

module.exports = {
  LoginUser: async (req, res, next) => {
    try {
      const user = await getUserByEmail(req.body.email);
      console.log(user);
      if (user.length === 0) {
        responseHelper.badRequest(res, "No user found by that email!", null);
        return;
      }
      const isPasswordValid = await bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        responseHelper.badRequest(res, "Invalid Password!", null);
        return;
      }

      const { full_name, email, created_at, _id } = user;

      const token = jwt.sign(
        { full_name, email, created_at, _id },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      responseHelper.success(res, "Success", token);
    } catch (error) {
      next(error);
    }
  },

  RegisterUser: async (req, res, next) => {
    try {
      if (req.body.email === "" || req.body.password === "") {
        responseHelper.badRequest(res, "Email and password are required", null);
        return;
      }
      const hashedPassword = await hashPassword(req.body.password);
      const user = await createUser({
        ...req.body,
        password: hashedPassword,
      });
      if (user) {
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

  Create: async (req, res, next) => {
    try {
      responseHelper.created(res, "Created successfully", null);
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
