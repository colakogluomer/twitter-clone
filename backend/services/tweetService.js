const Tweet = require("../models/Tweet");
const ApiError = require("../utils/ApiError");
const userService = require("../services/userService");

const createTweet = async (tweet) => {
  try {
    const newTweet = await Tweet.create(tweet);
    const user = await userService.getUserById(tweet.author);
    user.tweets.push(newTweet);
    await user.save();
    return newTweet;
  } catch (error) {
    throw new ApiError(404, error.message);
  }
};

module.exports = {
  createTweet,
};
