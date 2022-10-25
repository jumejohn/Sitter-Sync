const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  children: [Object],
  confirmedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitedUsers: [{ type: String, required: true }],
});

module.exports = mongoose.model("Event", EventSchema);
