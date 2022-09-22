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
};

module.exports = {
  SCRIPTS,
};
