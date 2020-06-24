module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        review_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
            len: [1]
            }
        },
        // review_rating: {
        //     type: DataTypes.INTEGER,
        //     defaultValue: 0
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        movieImdbID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Review;
  };
  