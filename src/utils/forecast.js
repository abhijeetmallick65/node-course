const request = require("request");

forcast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0e1d379a8f97cbac0e1d07762742e0de&query=${
    lat + "," + long
  }&unit=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to contact the api.", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, but it feels like it's ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = { forcast };
