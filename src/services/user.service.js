const User = require("../models/user.model");

const getAll = async () => {
  return await User.find();
};

const getById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  const newuser = new User(data);
  return await newuser.save();
};

const update = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  getUserByEmail,
  createUser,
  update,
  remove,
};
