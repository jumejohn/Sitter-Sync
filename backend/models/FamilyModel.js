const mongoose = require("mongoose");
const UserSchema = require("./UserModel.js");
const ChildSchema = require("./ChildModel.js");
const Schema = mongoose.Schema;

const FactSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const FamilySchema = new Schema({
  name: { type: String, required: true },
  parent1: { type: Schema.Types.ObjectId, ref: "User" },
  parent2: String,
  children: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  famFacts: [FactSchema],
  authUser: [UserSchema],
});

module.exports = mongoose.model("Family", FamilySchema);
