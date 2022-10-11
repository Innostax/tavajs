const SCRIPTS = {
    CYPRESS: [
        {
            name: "cypress",
            command: "npx cypress run",
        },
    ],
    JEST: {
        "vue": [
            {
                name: "test",
                command: "jest --silent",
            },
        ],
        "react": [
            {
                name: "test",
                command: "react-app-rewired test --verbose",
            },
        ],
    },
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
