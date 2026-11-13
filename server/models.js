const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
}));

const Project = mongoose.model('Project', new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  live: String,
  repo: String,
  order: { type: Number, default: 0 },
}));

module.exports = { Message, Project };