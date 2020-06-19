module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
  };
  