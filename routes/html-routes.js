// Routes
// =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "public/index.html"));
    });
    app.get("/review", function (req, res) {
      res.sendFile(path.join(__dirname, "public/review.html"));
    });
  };
  