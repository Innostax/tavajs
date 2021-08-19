const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const fs = require("fs");

app.get("/", (req, res) => {
  res.end("Hello");
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
app.listen(port, () => {
  console.log("app listening");
});