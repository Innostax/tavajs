const fs = require("fs");
const { readFile } = require("./helper");
const { render } = require("ejs");

const handleRenderEJS = (readFilePath, props, filePath) => {
  let dockerFile = readFile(readFilePath);
  dockerFile = render(dockerFile, { ...props });
  fs.writeFileSync(filePath, dockerFile, "utf8");
};

module.exports = { handleRenderEJS };
