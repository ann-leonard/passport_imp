module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
      allowNull: false
    }
  });



  return User;
};
