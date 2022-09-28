var shell = require("shelljs");

defaultEcho = shell.echo.bind(shell);
echos = [];
shell.echo = function () {
  defaultEcho.apply(shell, arguments);
  echos.push(Array.from(arguments));
};
module.exports = { defaultEcho, echos, echo: shell.echo };
