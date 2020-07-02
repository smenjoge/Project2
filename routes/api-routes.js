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

  // GET route to get details of input movie by calling OMDB API
  app.get("/api/movie/:name", async function(req, res) {
    let qs = {
        params: {
          t: req.params.name,
          apikey: process.env.API_KEY
        }
    };
    
    const response = await axios.get('http://www.omdbapi.com', qs);

    if (response.data.Response === "True") {
      const {Title, Poster, imdbID} = response.data;
      let checkMovie = 0;
      checkMovie = await db.Movie.count({
          where: {
            imdbID: imdbID
          }
      });
      if (checkMovie === 0) {
        const movieInsert = await db.Movie.create({Title, Poster, imdbID});
      }
    }
    res.json(response.data);
  });

  app.get("/api/reviews/:movieId", async function (req, res) {
    const dbReviews = await db.Movie.findAll({
          where: {
            imdbID:  req.params.movieId 
          },
          include: [db.Review]
    });
    res.json(dbReviews);
  });

  app.post("/api/reviews", async function(req, res) {
    const {review_title, review_name, review_text, MovieImdbID} = req.body;
    const results = await db.Review.create({review_title, review_name, review_text, MovieImdbID});    
    res.end();
  });

  app.put("/api/reviews/:id", async function (req, res) {
    let result;
    if (req.body.up) {
    result = await db.Review.increment("review_rating", {where : {id : req.params.id}});
    } else if (req.body.down) {
    result = await db.Review.decrement("review_rating", {where : {id : req.params.id}});
    }
    res.json(result);
  })

  // DELETE route for deleting review. We can get the id of the review to be deleted from
  // req.params.id
  app.delete("/api/reviews/:id", async function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    const results = await db.Review.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(results);
  });
};
