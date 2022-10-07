const validateKebabCase = (input) => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(input);

module.exports = { validateKebabCase };
