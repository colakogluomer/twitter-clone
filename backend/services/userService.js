const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new ApiError(404, error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new ApiError(404, error);
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    throw new ApiError(404, error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new ApiError(404, error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
};
