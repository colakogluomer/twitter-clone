const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ApiError = require("./utils/ApiError");
const errorHandling = require("./middlewares/errorHandling");
const authRoute = require("./routes/authRoute");
require("./models/User");
require("./models/Tweet");
require("./models/Tag");
require("./models/Notification");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Route Middlewares

app.get("/", (req, res, next) => {
  res.send("Hello there");
});
// app.use("/home", homeRoute);
// app.use("/:username", userRoute);
// app.use("/explore", exploreRoute);
app.use("/authentication", authRoute);

app.use(() => {
  throw new ApiError(404, "Page Not Found.");
});

//Error Handling middleware
app.use(errorHandling);

//Connect to database and then server is listened
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  )
  .catch((error) => console.log(error.message));
