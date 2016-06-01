var mongoose = require("mongoose");

var requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending', require: true }
}, {
  timestamps: true
});

var teamSchema = mongoose.Schema({
  creator:  { type: mongoose.Schema.ObjectId, ref: 'User' },
  name:     { type: String },
  members:  [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  requests: [requestSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model("Team", teamSchema);
