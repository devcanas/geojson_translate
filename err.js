const handleExit = (code) => {
  switch (code) {
    case 10:
      logError(errorMessages.invalidArguments);
      break;
    case 11:
      logError(errorMessages.fileNotFound);
      break;
    case 12:
      logError(errorMessages.parseError);
    default:
      break;
  }
};

const logError = (message) => {
  console.log("\n" + message + "\n");
};

const errorMessages = {
  invalidArguments: "Invalid arguments",
  fileNotFound: "Input file(s) not found",
  parseError: "Parsing failed. Make sure they are in valid Esri ASCII format"
};

module.exports = {
  handleExit
};
