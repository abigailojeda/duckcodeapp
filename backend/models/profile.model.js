module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
      name: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      imageName: {
        type: Sequelize.STRING
      }
    });

    Profile.associate = function(models) {
        Profile.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: "userId",
          as: "users",
        })
      }
  
    return Profile;
  };