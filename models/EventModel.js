const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String /* require: true */ },
  description: { type: String /* required: true */ },
  startDate: { type: Date /* required: true */ },
  endDate: { type: Date /* required: true  */ },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  children: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  confirmedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitedUsers: [{ type: String /*  required: true */ }],
});

module.exports = mongoose.model("Event", EventSchema);
