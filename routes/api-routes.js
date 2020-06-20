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
    let qs = {
        params: {
          s: req.params.name,
          apikey: '9f2b2ef1'
        }
    };
    
    const response = await axios.get('http://www.omdbapi.com', qs);
    // console.log(response.data);
    res.json(response.data.Search);
  });
};
