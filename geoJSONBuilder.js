const proj4 = require("proj4");
const { K } = require("./constants");

const build = (name, meta, riskData, uncertaintyData) => {
  const { ncols, nrows, NODATA_value } = meta;
  let geojson = K.geojsonTemplate;
  geojson.name = name;
  for (let row = 0; row < nrows; row++) {
    for (let col = 0; col < ncols; col++) {
      if (riskData[row][col] != NODATA_value) {
        let feature = {
          type: "Feature",
          properties: {},
          geometry: { type: "Polygon" }
        };

        setProperties(feature, riskData[row][col], uncertaintyData[row][col]);
        buildCoordinates(feature.geometry, { ...meta, row, col });
        geojson.features.push(feature);
      }
    }
  }
  return geojson;
};

const setProperties = (feature, risk, iqd) => {
  feature.properties.Risk = risk;
  feature.properties.IQD = iqd;
};

const buildCoordinates = (geometry, info) => {
  geometry.coordinates = [[]];
  const coords = coordinatesForPolygon(info);
  geometry.coordinates[0].push(...coords);
};

const coordinatesForPolygon = (info) => {
  const converted = true;
  const coords = [
    buildCoordinate(info, K.coordinateCalc.lowerLeftCorner),
    buildCoordinate(info, K.coordinateCalc.lowerRightCorner),
    buildCoordinate(info, K.coordinateCalc.topRightCorner),
    buildCoordinate(info, K.coordinateCalc.topLeftCorner),
    buildCoordinate(info, K.coordinateCalc.lowerLeftCorner)
  ];
  return converted ? coords.map(convertToMapboxCRS) : coords;
};

const buildCoordinate = (info, corner) => {
  const { nrows, cellsize, xllcorner, yllcorner, row, col } = info;
  return [
    xllcorner + (col - corner.cteX) * cellsize,
    yllcorner + (nrows - row - corner.cteY) * cellsize
  ];
};

const convertToMapboxCRS = (coord) => {
  return proj4(K.projections.source, K.projections.target, coord);
};

module.exports = {
  build
};
