const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");

const generateToken = async (email, type) => {
  try {
    return await jwt.sign({ sub: email, type: type }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const verifyToken = async (token) => {
  try {
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return decoded;
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
