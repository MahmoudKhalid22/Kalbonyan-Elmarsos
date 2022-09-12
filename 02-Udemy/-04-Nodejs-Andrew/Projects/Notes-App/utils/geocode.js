const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=d46db86c300165c90d45614bfff75a14&query=26.549999,31.700001";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
