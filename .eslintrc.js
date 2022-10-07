module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:jest/recommended",
    ],
    overrides: [
        {
            "files": ["bin/*.js"],
            "excludedFiles": "./test/test.spec.js"
        }
    ],
    plugins: [
        "ejs-js",
        "@babel",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
            presets: ["@babel/preset-react"],
        },
    },
    root: true,
    rules: {
        "no-console": [
            "warn",
            { allow: ["clear", "info", "error", "dir", "trace", "log"] },
        ],
        quotes: [
            "warn",
            "double",
        ],
        indent: [
            "error",
            4,
        ],
        semi: [
            "error",
            "always",
        ],
        "jest/prefer-expect-assertions": "off",
    },
};
