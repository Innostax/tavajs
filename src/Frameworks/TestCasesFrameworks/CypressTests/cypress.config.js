const { BASE_URL } = require("./cypress.constants.js");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        base_url: BASE_URL,
    }
});
