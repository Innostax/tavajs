const SCRIPTS = {
  CYPRESS: [
    {
      name: "cypress",
      command: "npx cypress run",
    },
  ],
  JEST: [
    {
      name: "test",
      command: "jest --silent",
    },
  ],
  MOCHA: [
    {
      name: "test",
      command: "vue-cli-service test:unit",
    },
  ],
  NIGHTWATCH: [
    {
      name: "test",
      command: "npx nightwatch",
    },
  ],
};

module.exports = {
  SCRIPTS,
};
