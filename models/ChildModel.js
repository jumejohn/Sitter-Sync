const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  childFacts: [{}],
});

module.exports = mongoose.model("Child", ChildSchema);
