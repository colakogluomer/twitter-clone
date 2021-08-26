const tweetService = require("../services/tweetService");

const create = async (req, res, next) => {
  try {
    const tweet = await tweetService.createTweet(req.body);
    res.send(tweet);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
