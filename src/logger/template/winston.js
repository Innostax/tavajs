const express = require("express");
const app = express();
app.use(express.json());
const port = 3040;
const fs = require("fs");
const logger = require('./utils/logger');
app.get("/", (req, res) => {
  res.send("Hello");
  logger.info("Server Sent A hello world");
});
app.get("/<%= defaultRoute %>", (req, res) => {
  res.send();

});
app.post("/<%= defaultRoute %>", (req, res) => {
  users.push();
  res.send();
});
app.get("/<%= defaultRoute %>/:id", (req, res) => {
  res.send();
});
app.put("/<%= defaultRoute %>/:id", (req, res) => {
  res.send();
});
app.delete("/<%= defaultRoute %>/:id", (req, res) => {
  res.send();
});

app.use((err,req,res,next) => {
    res.status(500).send('Could not reach the url');
       logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
    
// Capture 404 erors
app.use((req,res,next) => {
        res.status(404).send("PAGE NOT FOUND");
        logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
app.listen(port, () => {
  console.log("app listening");
  logger.info(`server started running on port:${port}`)
});