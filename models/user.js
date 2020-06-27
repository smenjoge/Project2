module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // User.associate = function(models) {
    //     // Associating Author with Posts
    //     // When an Author is deleted, also delete any associated Posts
    //     User.hasMany(models.Review, {
    //       onDelete: "cascade"
    //     });
    //   };
    return User;
  };
  

  //need to assoc user to review by using: User.hasMany(Review);