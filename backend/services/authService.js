const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const register = async (user) => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) throw new ApiError(404, "User already exist!");

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = null;
  if (user.email) {
    newUser = await User.create({
      name: user.name,
      username: user.username,
      password: hashedPassword,
      email: user.email,
      birthDate: user.birthDate,
    });
  } else {
    newUser = await User.create({
      name: user.name,
      username: user.username,
      password: hashedPassword,
      phone: user.phone,
      birthDate: user.birthDate,
    });
  }

  const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

const login = async (user) => {
  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) throw new ApiError(404, "User does not exist!");
  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    existingUser.password
  );
  if (!isPasswordCorrect) throw new ApiError(400, "Wrong password!");

  const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  const session = {
    name: existingUser.name,
    username: existingUser.username,
    _id: existingUser._id,
    token,
  };
  return session;
};

module.exports = {
  register,
  login,
};
