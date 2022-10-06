const shell = require("shelljs");

const defaultEcho = shell.echo.bind(shell);

const echos = [];
shell.echo = function () {
  defaultEcho.apply(shell, arguments);
  echos.push(Array.from(arguments));
};

module.exports = { defaultEcho, echos, echo: shell.echo };