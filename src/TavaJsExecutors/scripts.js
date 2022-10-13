const {FRAMEWORKS} = require("./constants");
const {REACT, VUE } = FRAMEWORKS;
const SCRIPTS = {
    CYPRESS: [
        {
            name: "cypress",
            command: "npx cypress run",
        },
    ],
    JEST: {
        [VUE]: [
            {
                name: "test",
                command: "jest --silent",
            },
        ],
        [REACT]: [
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
