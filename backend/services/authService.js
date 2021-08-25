const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const userService = require("../services/userService");
const { generateToken, verifyToken } = require("../utils/token");

const register = async (user) => {
  const existingUser = await userService.getUserByEmail(user.email);

  if (existingUser) throw new ApiError(404, "User already exist!");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await userService.createUser({
    name: user.name,
    username: user.username,
    password: hashedPassword,
    email: user.email,
    birthDate: user.birthDate,
  });

  const token = generateToken(newUser.email, process.env.REGISTER_TOKEN);

  const session = {
    name: newUser.name,
    username: newUser.username,
    token,
  };

  return session;
};

const login = async (user) => {
  const existingUser = await userService.getUserByEmail(user.email);

  if (!existingUser) throw new ApiError(404, "User does not exist!");
  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isPasswordCorrect) throw new ApiError(400, "Wrong password!");

  const token = await generateToken(
    existingUser.email,
    process.env.LOGIN_TOKEN
  );

  const session = {
    name: existingUser.name,
    username: existingUser.username,
    token,
  };

  return session;
};

const resetPassword = async (token, newPassword) => {
  const decodedToken = await verifyToken(token);
  const user = await userService.getUserByEmail(decodedToken.sub);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userService.updateById(user._id, hashedPassword);
  return "ok";
};
module.exports = {
  register,
  login,
  resetPassword,
};
