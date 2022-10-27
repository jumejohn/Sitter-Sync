const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const UserSchema = new Schema({
  username: { type: String, required: false, unique: true },
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  children: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
