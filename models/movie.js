module.exports = function(sequelize, DataTypes) {
    const Movie = sequelize.define("Movie", {
        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Poster: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imdbID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Movie;
  };
  