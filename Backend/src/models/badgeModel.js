// models/Badge.js
const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '' }, // Link to an icon image or emoji code.
  description: { type: String, default: '' },
  criteria: { type: String, default: '' }, // For documentation purposes.
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
