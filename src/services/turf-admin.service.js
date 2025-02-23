const TurfAdmin = require("../models/turf-admin.model");

const getAll = async () => {
  return await TurfAdmin.find();
};

const getTurfAdminByEmail = async (email) => {
  return await TurfAdmin.find({ email });
};
const getById = async (id) => {
  return await TurfAdmin.findById(id);
};

const createTurfAdmin = async (data) => {
  const newTurfAdmin = new TurfAdmin(data);
  return await newTurfAdmin.save();
};

const update = async (id, data) => {
  return await TurfAdmin.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await TurfAdmin.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  getTurfAdminByEmail,
  createTurfAdmin,
  update,
  remove,
};
