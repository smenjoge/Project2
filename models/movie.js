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
            allowNull: false,
            primaryKey: true
        }
    });

    Movie.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Movie.hasMany(models.Review, {
          onDelete: "cascade"
        });
      };

    return Movie;
  };
  