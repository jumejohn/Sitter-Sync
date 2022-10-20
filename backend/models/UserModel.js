const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: String,
  image: String,
});

module.exports = mongoose.model("User", UserSchema);
