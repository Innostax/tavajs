const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },

});

module.exports = mongoose.model("<%= routeName %>", schema);


