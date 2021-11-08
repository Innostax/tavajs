const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: String,
	username: String,
	email: String,
})

module.exports = mongoose.model('<%= routeName %>', schema)
