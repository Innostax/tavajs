//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const users = require(`./Routes/users.routes`);

const conn = require('./mongoose')


const port = process.env.PORT

const app = express();


 conn()


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(`/users`, users);

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

module.exports = app;