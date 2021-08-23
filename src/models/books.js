const Books = (sequelize, DataTypes) =>
  sequelize.define("Books", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Books;
