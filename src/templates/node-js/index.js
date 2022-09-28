//jshint esversion:6
<% if(isWinston) {%>const logger = require('./utils/logger')<%}%>
const express = require("express");
const { auth } = require('express-openid-connect')
const cors=require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { selectionRoute } = require('./routes')
<% if (mongoSelected) { %>
const conn = require('./mongoose')
<% } %>
<% if (isAuth0) { %>
let jwt = require('express-jwt')
const config = {
	authRequired: false,
	auth0Logout: true,
	baseURL: 'http://localhost:3040',
	clientID: process.env.AUTH_CLIENTID,
	issuerBaseURL: 'https://dev-gbyd4ldp.us.auth0.com',
	secret: process.env.AUTH_SECRET,
}
<% } %>

<%if (blobServiceName == "azure") {%>
const { sampleBlobServiceExecutor } = require('./utils/blob/azure')
sampleBlobServiceExecutor()
<% } %>

<%if (isAmazonSes) {%>
const { sendMail } = require('./utils/email/amazon_ses')
const mailParams = {
	to: ["Recipients Email"],
	from: "Sender Email",
	subject: "Subject",
	html: "htmlMessage",
	text: "textMessage",
}
sendMail(mailParams)
<% } %>  

<%if (blobServiceName == "aws-s3") {%>
const { sampleAwsS3Executor } = require('./utils/blob/aws-s3.js')
sampleAwsS3Executor()
<% } %>
  
const port = process.env.PORT

const app = express();

<% if (mongoSelected) { %>
 conn()
<% } %>

app.set('view engine', 'ejs');
<% if(isAuth0){%>app.use(auth(config))<%}%>

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
