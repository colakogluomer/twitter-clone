const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const register = async (user) => {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) throw new ApiError(404, "User already exist!");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await User.create({
    name: user.name,
    username: user.username,
    password: hashedPassword,
    email: user.email,
    birthDate: user.birthDate,
  });

  const token = jwt.sign(
    { username: newUser.username },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

module.exports = {
  register,
};
