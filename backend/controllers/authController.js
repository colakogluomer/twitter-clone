const authService = require("../services/authService");

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

module.exports = {
  register,
  login,
};
