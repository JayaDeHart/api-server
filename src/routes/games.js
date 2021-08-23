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
    const game = await Games.getAll();
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
}

async function getGameById(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    let game = await Games.getOne(id)
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
    let updatedGame = await Games.update(id, update)
    res.status(202).json(updatedGame);
  } catch (err) {
    next(err);
  }
}

async function deleteGame(req, res, next) {
  const id = req.params.id;
  try {
    await Games.destroy(id);
    res.status(204).json(null);
  } catch (err) {
    next(err);
  }
}

module.exports = gameRoutes;
