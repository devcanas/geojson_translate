const fs = require("fs");
const { argv } = require("process");

const parser = require("./parser");
const err = require("./err");

process.on("exit", err.handleExit);

if (process.argv.length != 4) {
  process.exit(10);
}

const riskFile = argv[2];
const uncertaintyFile = argv[3];

console.log(riskFile);

if (!(fs.existsSync(riskFile) && fs.existsSync(uncertaintyFile))) {
  process.exit(11);
}

const promiseForFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

Promise.all([promiseForFile(riskFile), promiseForFile(uncertaintyFile)])
  .then((filesData) => processFileData(...filesData))
  .catch((_) => process.exit(12));

const processFileData = (riskFileData, uncertaintyFileData) => {
  const riskData = parser.parse(riskFileData);
  const uncertaintyData = parser.parse(uncertaintyFileData);
};
