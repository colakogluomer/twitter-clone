const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 255,
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      autopopulate: { maxDepth: 2 },
      required: false,
    },
  ],
});
TagSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Tag", TagSchema);
