const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const contactSchema = new mongoose.Schema({
  contactId: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);