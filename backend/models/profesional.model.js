module.exports = (sequelize, Sequelize) => {
    const Profesional = sequelize.define("profesional", {
      category: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      tecnologies: {
        type: Sequelize.STRING
      },
      benefits: {
        type: Sequelize.STRING
      },
      isCompany: {
        type: Sequelize.BOOLEAN
      }
    });

    Profesional.associate = function(models) {
        Profesional.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: "userId",
          as: "users",
        })
      }
  
    return Profesional;
  };