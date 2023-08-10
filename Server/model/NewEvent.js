const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EventSchema = new mongoose.Schema({
  usereventname: { type: String },
  usereventdescription: { type: String },
  usereventlocation: { type: String },
  usereventtime: { type: String },
  eventimg: { type: String },
  usereventorggmail: { type: String },
  usereventorgname: { type: String },
  usereventlean: { type: String },
  usereventlanguage: { type: String },
  userevententryage: { type: String },
  usereventduration: { type: String },
  usereventcategory: { type: String },
  usersregisterd: { type: Array },
});

const eventModel = new model("Events", EventSchema);
module.exports = eventModel;
