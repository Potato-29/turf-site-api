const Turf = require("../models/turf.model");

const getAll = async (query) => {
  if (query) {
    return await Turf.aggregate([
      {
        $match: {
          ...query?.filter,
        },
      },
      { ...query?.sort },
      { $skip: query.skip },
      { $limit: query.limit },
    ]);
  } else {
    return await Turf.find();
  }
};

const getTurfById = async (id) => {
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
  getTurfById,
  createTurf,
  updateTurf,
  remove,
};
