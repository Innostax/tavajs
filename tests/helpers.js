const shell = require("shelljs");

const defaultEcho = shell.echo.bind(shell);

const echos = [];

shell.echo = function () {
  defaultEcho.apply(shell, arguments);
  echos.push(arguments[0]);
};

module.exports = { defaultEcho, echos, echo: shell.echo };
