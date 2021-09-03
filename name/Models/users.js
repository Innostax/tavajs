const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: String,
  phone_number: Number,
});

module.exports = mongoose.model("User", userSchema);