//jshint esversion:6
<% if(isWinston) {%>const logger = require('./utils/logger')<%}%>
const express = require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const <%= defaultRoute %> = require(`./Routes/<%= defaultRoute %>.routes`);
const secondUser = require(`./Routes/secondUser.routes`)
<% if (mongoSelected) { %>
const conn = require('./mongoose')
<% } %>
  
const port = process.env.PORT

const app = express();

<% if (mongoSelected) { %>
 conn()
<% } %>

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.use(`/<%= defaultRoute %>`, <%= defaultRoute %>);
app.use('/secondUser', secondUser)
app.listen(port, function() {
  <% if(isWinston) {%>logger.info(`server started running on port ${port}`)<%}%>
  <% if(!(isWinston||isSentry)){%>
  console.log(`Server started on port ${port}`);<%}%>
});

module.exports = app;