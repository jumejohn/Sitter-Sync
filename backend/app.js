const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

mongoose.connect("mongodb://localhost/sittersynced", (err) => {
  {
    err ? console.log(err) : console.log("connected to MongoDB");
  }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", require("./routes/api.route"));
app.use("/user", require("./routes/user"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
