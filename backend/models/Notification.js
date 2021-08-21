const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  content: {
    type: String,
    require: false,
  },
});
module.exports = mongoose.model("Notification", NotificationSchema);
