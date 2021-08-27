const ejs = require("ejs");

const render = (content, data) => {
  return ejs.render(content, data);
};

module.exports = { render };
