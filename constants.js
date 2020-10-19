let geojsonTemplate = {
  type: "FeatureCollection",
  name: "exampleJSon",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::3763" } },
  features: []
};

const projections = {
  source:
    "+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs ",
  target: "WGS84"
};

const coordinateCalc = {
  lowerLeftCorner: {
    cteX: 1,
    cteY: 2
  },
  lowerRightCorner: {
    cteX: 0,
    cteY: 2
  },
  topRightCorner: {
    cteX: 0,
    cteY: 1
  },
  topLeftCorner: {
    cteX: 1,
    cteY: 1
  }
};

const K = {
  geojsonTemplate,
  projections,
  coordinateCalc
};

module.exports = { K };
