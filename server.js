const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Routes
require("./controllers/articles-controller.js")(app);
require("./controllers/notes-controller.js")(app);
require("./controllers/scraper-controller.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});