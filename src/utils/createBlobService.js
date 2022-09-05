const fs = require("fs");
const path = require("path");
//function to create Blob services------------------------------------------------->
function createBlobService(blobServiceName, blobTemplatePath, backEndPath) {
  let contents = fs.readFileSync(blobTemplatePath + ".js", "utf-8");
  let servicePath = path.join(backEndPath, "utils", "blob");
  fs.mkdirSync(servicePath);
  fs.writeFile(
    `${servicePath}` + "/" + `${blobServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
      // console.log("Blob service created successfully.");
    }
  );
}
module.exports = createBlobService;
