const adminModel = require("../models/admin.model");

const getAll = async () => {
  return await adminModel.find();
};

const getById = async (id) => {
  return await adminModel.findById(id);
};

const createSchedule = async (data) => {
  const newadmin = new adminModel(data);
  return await newadmin.save();
};

const update = async (id, data) => {
  return await adminModel.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await adminModel.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  createSchedule,
  update,
  remove,
};
