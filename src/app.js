const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

// const request = require("request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// Define paths for express config
// const homePath = `${__dirname}/../public`;
const homePath = path.join(__dirname, "/../public");
const viewsPath = path.join(__dirname, "../tempelates/views");
const partialsPath = path.join(__dirname, "../tempelates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(homePath));

// handlebars config : dynamic pages
app.get("", (req, res) => {
  res.render("index", {
    title: "Home page",
    name: "Abhijeet",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Abhijeet",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Abhijeet",
    message: "get help",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: `please provide a 'Search' query` });
  }
  console.log(req.query);

  res.send({
    product: [],
  });
});

// connecting backend to front end
// "console.log()" replaced by "res.send()"
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("404error", {
      title: "404 error",
      name: "abhijeet",
      msg: "Please prove and address query :)",
    });
  }
  const location = req.query.address;
  geocode.geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast.forcast(latitude, longitude, (error, data2) => {
      if (error) return res.send({ error });
      res.send({
        forecast: data2,
        location,
        address: req.query.address,
      });
    });
  });
});

// handle errors , should be at last and just before the "listen" handler
app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "404 Error occured",
    msg: "Help article not found",
    name: "Abhijeet",
  });
});
app.get("*", (req, res) => {
  res.render("404error", {
    title: "404 Error occured",
    msg: "Page not found",
    name: "Abhijeet",
  });
});

// Listen to the web server at port 3000
// app.listen("3000", () => {
//   console.log("app started !");
// });

// listen to the web server at heroku's expected port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// normal config : static pages
// app.get("", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/help", (req, res) => {
//   res.send("Help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About us</h1>");
// });
