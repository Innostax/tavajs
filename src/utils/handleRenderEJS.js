const fs = require("fs");
const { readFile } = require("./helper");
const { render } = require("ejs");

const handleRenderEJS = (readFilePath, props, writeFilePath) => {
  let dockerFile = readFile(readFilePath);
  dockerFile = render(dockerFile, { ...props });
  fs.writeFileSync(writeFilePath, dockerFile, "utf8");
};

module.exports = { handleRenderEJS };
