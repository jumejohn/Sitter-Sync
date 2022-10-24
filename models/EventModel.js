const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  confirmedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
