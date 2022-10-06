module.exports = {
    "env": {
        "browser": true,
        "node": true, 
        "es2021": true
    },
    "extends": [
        "eslint:recommended", 
        "plugin:jest/recommended",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    root: true,
    "rules": {
        quotes: [
            "warn",
            "double"
        ],
        indent: [
            "error",
            4
        ],
        semi: [
            "error",
            "always"
        ],

    }
};