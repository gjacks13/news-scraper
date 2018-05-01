const express = require("express");
const db = require("./models");

module.exports = function(app) {
  // Create all our routes and set up logic within those routes where required.
  app.get("/article/:articleId/note", function(req, res) {
    note.all(function(data) {
      var hbsObject = {
        cats: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.post("/article/:articleId/note", function(req, res) {
    note.create([
      "name", "sleepy"
    ], [
      req.body.name, req.body.sleepy
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  app.delete("/article/:articleId/note/:noteId", function(req, res) {
    var condition = "id = " + req.params.id;

    note.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
};