//jshint esversion:6
<% if(isWinston) {%>const logger = require('./utils/logger')<%}%>
const express = require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { selectionRoute } = require('./routes')
<% if (mongoSelected) { %>
const conn = require('./mongoose')
<% } %>
<% if (isAuth0) { %>
let jwt = require('express-jwt')

const authorization=jwt({
	secret: process.env.AUTH_SECRET,
	audience: process.env.AUTH_AUDIENCE,
	issuer: process.env.AUTH_ISSUER,
	algorithms: ['HS256'],
})

<% } %>
  
const port = process.env.PORT

const app = express();

<% if (mongoSelected) { %>
 conn()
<% } %>

app.set('view engine', 'ejs');
<% if(isAuth0){%>app.use(authorization)<%}%>

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.get(selectionRoute(app))
app.listen(port, function() {
  <% if(isWinston) {%>logger.info(`server started running on port ${port}`)<%}%>
  <% if(!(isWinston||isSentry)){%>
  console.log(`Server started on port ${port}`);<%}%>
});

module.exports = app;