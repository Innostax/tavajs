const SCRIPTS = {
  CYPRESS: [{
    name: "cypress",
    command:
      "npm install cypress --dev && npx cypress install && npx cypress open",
  }],
  JEST: [{
    name: "test",
    command: "jest",
  }],
  PRETTY: [{
    name: "pretty",
    command:
      'npx prettier --write "src/**/*.js" "src/**/*.jsx" "src/**/*.css"',
  }],
};

module.exports = {
  SCRIPTS,
};
