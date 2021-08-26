const { createLogger, format, transports } = require('winston')
const logger = createLogger({
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()],
})

module.exports = logger