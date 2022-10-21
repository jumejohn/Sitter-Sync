const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./UserModel");
const FamilySchema = require("./FamilyModel");

const FactSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const ChildSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  parents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  childFacts: [FactSchema],
});
module.exports = mongoose.model("Child", ChildSchema);
