const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const ChildSchema = require("./ChildModel");
const FamilySchema = require("./FamilyModel");
const EventSchema = require("./EventModel");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  children: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  // this.salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
