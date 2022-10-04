const Sentry = require('@sentry/node')

Sentry.init({
	dsn: "Enter your Domain Source Name",
})

module.exports = Sentry
