const Games = (sequelize, DataTypes) =>
  sequelize.define("Games", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Games;
