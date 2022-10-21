const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
const familyRoutes = require("./routes/family");

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/family", familyRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app.listen(port, () => {
  console.log(`Node.js listening on port 8000`);
});
