const Sentry = require('@sentry/node')

Sentry.init({
	dsn: "paste your DSN here",
})

module.exports = Sentry
