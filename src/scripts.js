const SCRIPTS = {
  CYPRESS: [
    {
      name: "cypress",
      command: "npx cypress open",
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
      command: "vue-cli-service test:e2e",
    },
  ],
};

module.exports = {
  SCRIPTS,
};
