var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  local: {
    teamName:   { type: String },
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Team", teamSchema);
