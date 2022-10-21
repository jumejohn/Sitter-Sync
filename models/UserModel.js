const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const FamilySchema = require("./FamilyModel");
const EventSchema = require("./EventModel");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
