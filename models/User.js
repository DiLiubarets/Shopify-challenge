const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  sensorData: [{ value: Number, timestamp: Number }],
});

module.exports = User = mongoose.model("users", UserSchema);
