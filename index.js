var start = new Date().getTime();

const fs = require("fs");
const { argv } = require("process");

const { parse } = require("./parser");
const { build } = require("./geoJSONBuilder");
const { sjs, attr } = require("slow-json-stringify");

const { handleExit } = require("./err");
process.on("exit", handleExit);

const stringify = sjs({
  type: attr("string"),
  name: attr("string"),
  crs: { type: attr("string"), properties: { name: attr("string") } },
  features: attr(
    "array",
    sjs({
      type: attr("string"),
      properties: { Risk: attr("number"), IQD: attr("number") },
      geometry: {
        type: attr("string"),
        coordinates: attr("array")
      },
      style: {
        __comment: attr("string"),
        fill: attr("string")
      }
    })
  )
});

if (process.argv.length != 5) {
  process.exit(10);
}

const name = argv[4];
const riskFile = argv[2];
const uncertaintyFile = argv[3];

if (!(fs.existsSync(riskFile) && fs.existsSync(uncertaintyFile))) {
  process.exit(11);
}

const promiseForFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "ascii", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

Promise.all([promiseForFile(riskFile), promiseForFile(uncertaintyFile)])
  .then((filesData) => processFileData(...filesData))
  .catch((err) => {
    console.log(err);
    process.exit(12);
  });

const processFileData = (riskFileData, uncertaintyFileData) => {
  const riskData = parse(riskFileData);
  const uncertaintyData = parse(uncertaintyFileData);
  const geojson = build(
    name,
    riskData.meta,
    riskData.data,
    uncertaintyData.data
  );
  const stringGeoJSON = stringify(geojson);

  fs.writeFile(`${name}.geojson`, stringGeoJSON, (err, _) => {});

  var end = new Date().getTime();
  var time = end - start;
  console.log("Done.");
  console.log(time / 1000 + " seconds");
};
