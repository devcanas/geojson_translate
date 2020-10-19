const parse = (fileData) => {
  const lines = fileData.split(/\r?\n/);
  var metadata = lines
    .slice(0, 6)
    .map((line) => {
      line = line.split("\t");
      return JSON.parse('{"' + line[0] + '": ' + line[1] + "}");
    })
    .reduce((res, item) => {
      const key = Object.keys(item)[0];
      res[key] = item[key];
      return res;
    });

  var cellData = lines
    .slice(6)
    .map((line) => line.split(" "))
    .map((line) => line.map((item) => eval(item)));

  return { meta: { ...metadata }, data: cellData };
};

module.exports = {
  parse
};
