const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  description: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
