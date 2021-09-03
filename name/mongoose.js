const mongoose = require("mongoose")
require("dotenv").config();
function conn(){

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

}
module.exports = conn