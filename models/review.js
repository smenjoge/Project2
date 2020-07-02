module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        review_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review_name: {
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
        review_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // movieImdbID: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    });

    Review.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Review.belongsTo(models.Movie, {
          foreignKey: {
            allowNull: false
          },
          sourceKey: 'imdbID'
        });
    };

    // Review.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Review.belongsTo(models.User, {
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    // };
    
    return Review;
  };
  