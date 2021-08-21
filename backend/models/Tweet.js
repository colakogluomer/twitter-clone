const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 255,
  },
  content: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 255,
  },
  media: {
    type: String,
    required: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
      required: false,
    },
  ],
  retweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: false,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: false,
    },
  ],
});
TweetSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Tweet", TweetSchema);
