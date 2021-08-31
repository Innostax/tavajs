const mongoose = require("mongoose")
require("dotenv").config();
function conn(){
    mongoose.connect("mongodb://localhost:27017/" + DBNAME ,{ useNewUrlParser: true })
        .catch(error => console.log(error));
}