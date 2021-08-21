const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 255,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 20,
  },
  personalInformation: {
    type: String,
    required: false,
    minlength: 0,
    maxLength: 160,
  },
  location: {
    type: String,
    required: false,
    minlength: 0,
    maxLength: 30,
  },
  website: {
    type: String,
    required: false,
    minlength: 0,
    maxLength: 30,
  },
  follows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: false,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
      required: false,
    },
  ],
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
      required: false,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
      required: false,
    },
  ],
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
      required: false,
    },
  ],
  profilePhoto: {
    type: String,
    required: false,
  },
  backPhoto: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    minLength: 6,
    maxLength: 255,
    validate: [validator.isEmail, "invalid email"],
  },
  phone: {
    type: Number,
    required: false,
    maxLength: 15,
  },
  password: {
    type: String,
    required: false,
    maxLength: 255,
    minLength: 6,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: true,
      required: false,
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      autopopulate: true,
      required: false,
    },
  ],
  protected: {
    type: Boolean,
    default: false,
  },
});
UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("User", UserSchema);
