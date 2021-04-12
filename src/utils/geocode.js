const request = require("request");

const geocode = (data, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    data
  )}.json?access_token=pk.eyJ1IjoiYWJoaWplZXQ2NSIsImEiOiJja243cXdreTgwYjNpMnhxbjl2amg0dWFzIn0.1JazJ1xEF4BG9sYuv0ZyVA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to contact the api.", "");
    } else if (body.features.length === 0) {
      callback("Please enter valid location.", undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = { geocode };
