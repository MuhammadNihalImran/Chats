const mongoose = require("mongoose");

// Define the schema
const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Chat = mongoose.model("Chat", messageSchema);

module.exports = { Chat };
