const { defineConfig } = require("cypress");
const { BASE_URL } = require("./cypress.constants.js");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents() {
            // implement node event listeners here
        },
    },
    env: {
        base_url: BASE_URL,
    },
});
