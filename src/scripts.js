const SCRIPTS = {
  CYPRESS: [
    {
      name: "cypress",
      command:
        "npm install cypress --dev && npx cypress install && npx cypress open",
    },
  ],
  JEST: [
    {
      name: "test",
      command: "jest --silent",
    },
  ],
};

module.exports = {
  SCRIPTS,
};
