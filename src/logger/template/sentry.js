const Sentry = require('@sentry/node')

Sentry.init({
	dsn: "paste your Domain Source Name here",
})

module.exports = Sentry
