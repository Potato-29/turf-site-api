const Schedule = require("../models/schedule.model");

const getAllSchedules = async (query) => {
  if (query) {
    return await Schedule.find(query);
  } else {
    return await Schedule.find();
  }
};

const getById = async (id) => {
  return await Schedule.findById(id);
};

const createSchedule = async (data) => {
  const newschedule = new Schedule(data);
  return await newschedule.save();
};

const insertManySchedules = async (payload) => {
  const schedules = Schedule.insertMany(payload);
  return await schedules;
};

const update = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};

module.exports = {
  getAllSchedules,
  getById,
  createSchedule,
  insertManySchedules,
  update,
  remove,
};
