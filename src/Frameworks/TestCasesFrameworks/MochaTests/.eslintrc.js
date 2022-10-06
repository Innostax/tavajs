module.exports = {
    extends : [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    overrides: [
        {
          files: [
            "**/__tests__/*.{j,t}s?(x)",
            "**/tests/unit/**/*.spec.{j,t}s?(x)"
          ],
          env: {
            mocha: true
          }
        }
    ]
}
