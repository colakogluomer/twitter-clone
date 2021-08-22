const authService = require("../services/authService");
const { generateToken } = require("../utils/generateToken");
const email = require("../utils/email");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    console.log(req.body.email);
    const forgotPasswordToken = await generateToken(req.body.email);
    await email.sendResetPasswordEmail(req.body.email, forgotPasswordToken);
    res.send("Check your email");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.send("Password has been changed");
  } catch (error) {}
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
