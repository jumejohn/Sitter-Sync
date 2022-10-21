const mongoose = require("mongoose");
const UserSchema = require("./UserModel.js");
const Schema = mongoose.Schema;

const FactSchema = new Schema({
  description: { type: String, required: true },
});

const ChildSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  childFacts: [FactSchema],
});

const FamilySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "User" },
  children: [ChildSchema],
  famFacts: [FactSchema],
});

module.exports = mongoose.model("Family", FamilySchema);
