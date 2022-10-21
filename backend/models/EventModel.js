const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChildSchema = require("./ChildModel.js");

const EventSchema = new Schema({
  end: Date,
  start: Date,
  description: String,
  location: String,
  summary: String,
  attendees: [{ type: Schema.Types.ObjectId, ref: "Child" }],
});

module.exports = mongoose.model("Event", EventSchema);
