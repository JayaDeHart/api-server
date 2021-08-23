const express = require("express");

const { Games } = require("../models/index");

const gameRoutes = express.Router();

gameRoutes.get("/games", getGames);

gameRoutes.get("/games/:id", getGameById);

gameRoutes.post("/games", createGame);

gameRoutes.put("/games/:id", updateGame);

gameRoutes.delete("/games/:id", deleteGame);

async function getGames(req, res, next) {
  try {
    let allGames = await Games.findAll();
    res.status(200).json(allGames);
  } catch (err) {
    next(err);
  }
}

async function getGameById(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    let game = await Games.findOne({ where: { id: id } });
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
}

async function createGame(req, res, next) {
  try {
    let game = await Games.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
}

async function updateGame(req, res, next) {
  const id = req.params.id;
  const update = req.body;
  try {
    let game = await Games.findOne({ where: { id: id } });
    let updatedGame = await game.update(update);
    res.status(202).json(updatedGame);
  } catch (err) {
    next(err);
  }
}

async function deleteGame(req, res, next) {
  const id = req.params.id;
  try {
    await Games.destroy({ where: { id: id } });
    res.status(204).json(null);
  } catch (err) {
    next(err);
  }
}

module.exports = gameRoutes;
