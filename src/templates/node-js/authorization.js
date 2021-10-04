var jwt = require("express-jwt");

module.exports = jwt({
  secret: process.env.AUTH_SECRET,
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ["HS256"],
});
