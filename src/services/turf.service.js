const Turf = require("../models/turf.model");

const getAll = async () => {
  return await Turf.find();
};

const getById = async (id) => {
  return await Turf.findById(id);
};

const createTurf = async (data) => {
  const newturf = new Turf(data);
  return await newturf.save();
};

const updateTurf = async (id, data) => {
  return await Turf.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await Turf.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  createTurf,
  updateTurf,
  remove,
};
