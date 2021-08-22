const jwt = require("jsonwebtoken");

const generateToken = (email, type, next) => {
  try {
    return jwt.sign({ sub: email, type }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateToken,
};
