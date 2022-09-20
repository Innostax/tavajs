const express = require("express");
const app = express();
app.use(express.json());
const port = 3040;
const { createLogger, format, transports } = require("winston");

const levels = ["info", "error"]; // Logger levels

const logger = createLogger({
  transports: levels.map((each) => {
    new transports.File({
      filename: `${each}.log`,
      level: each,
      format: format.combine(format.splat(), format.simple()),
    });
  }),
});

/*-------EndPoint for testing-------*/
app.get("/test", (req, res) => {
  res.send("Hii Winston is running now...");
  logger.info(`Winston is running now...`);
});

// Capture 500 erors
app.use((err, req, res, next) => {
  res.status(500).send("Could not reach the url");
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 erors
app.use((req, res, next) => {
  res.status(404).send("PAGE NOT FOUND");
  logger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

app.listen(port, () => {
  logger.info(`logger server running on port: ${port}`);
});

module.exports = logger;
