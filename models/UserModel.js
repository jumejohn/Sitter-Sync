const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const EventSchema = require("./EventModel");

const FactSchema = new Schema({
  description: { type: String, required: true },
});

const ChildSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  childFacts: [FactSchema],
});

const UserSchema = new Schema({
  username: { type: String, required: false, unique: true },
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  children: [ChildSchema],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
