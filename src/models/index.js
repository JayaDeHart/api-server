"use strict";
const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    : {};
const { Sequelize, DataTypes } = require("sequelize");
const gamesSchema = require("./games.js");
const booksSchema = require("./books.js");
const collectionClass = require("./collection-class");
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);


//schema -> model -> class
const booksModel = booksSchema(sequelize, DataTypes);
const gamesModel = gamesSchema(sequelize, DataTypes);

const booksCollection = new collectionClass(booksModel);
const gamesCollection = new collectionClass(gamesModel);






module.exports = {
  db: sequelize,
  Games: gamesCollection,
  Books: booksCollection,
};
