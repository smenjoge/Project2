// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
const db = require("../models");
const axios = require('axios');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/movie/:name", async function(req, res) {
    console.log(`Movie Name `, req.params.name);
    let qs = {
        params: {
          t: req.params.name,
          apikey: process.env.API_KEY
        }
    };
    
    const response = await axios.get('http://www.omdbapi.com', qs);
    const {Title, Poster, imdbID} = response.data;
    const movieInsert = await db.Movie.create({Title, Poster, imdbID});
    res.json(response.data);
  });

  //app.get("/api/reviews"

  app.post("/api/reviews", async function(req, res) {
    const {review_title, review_text, movieImdbID} = req.body;
    const results = await db.Review.create({review_title, review_text, movieImdbID});
    console.log(`Post review: `, results);
    res.end();
  });
};
