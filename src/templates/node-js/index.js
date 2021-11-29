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
<% if (isRedis) { %>
const { redis_get, client } = require("./redis");
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

<% if(isRedis) { %>
  app.use("/", async (req, res, next) => {
  key = req.path;
  const isPresentInRedis = await redis_get(key);
  if (isPresentInRedis) {
    if (req.method == "POST") {
      client.del(key);
    } else {
      return res.status(200).send(JSON.parse(isPresentInRedis));
    }
  }
  next();
});
<% } %>

app.get(selectionRoute(app))
app.listen(port, function() {
  <% if(isWinston) {%>logger.info(`server started running on port ${port}`)<%}%>
  <% if(!(isWinston||isSentry)){%>
  console.log(`Server started on port ${port}`);<%}%>
});

module.exports = app;