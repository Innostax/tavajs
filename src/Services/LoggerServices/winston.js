const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'info',
      filename: 'Info.log',
    }),
    new transports.File({
      level: 'error',
      filename: 'Error.log',
    }),
  ],
})

module.exports = logger;
