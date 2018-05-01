const express = require("express");

// Import the model (article.js) to use its database functions.
const article = require("../models/article.js");
const DEFAULT_NEWS_SOURCE="http://rss.cnn.com/rss/cnn_topstories.rss";

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request.get(DEFAULT_NEWS_SOURCE, function(error, response, body) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // grab each article
      $(".regularitem").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h4")
          .children("a")
          .text();
        result.link = $(this)
          .children("h4")
          .children("a")
          .attr("href");

        let summary = $(this)
          .children("div")
          .text();
        // if summary isn't empty use it; otherwise, use the empty string
        result.summary = summary ? summary : "";

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            //console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
};