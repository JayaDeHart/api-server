const express = require("express");

const { Books } = require("../models/index");

const bookRoutes = express.Router();

bookRoutes.get("/books", getBooks);

bookRoutes.get("/books/:id", getBookById);

bookRoutes.post("/books", createBook);

bookRoutes.put("/books/:id", updateBook);

bookRoutes.delete("/books/:id", deleteBook);

async function getBooks(req, res, next) {
  try {
    const book = await Books.getAll();
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    let book = await Books.getOne(id)
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

async function createBook(req, res, next) {
  try {
    let book = await Books.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  const id = req.params.id;
  const update = req.body;
  try {
    let updatedBook = await Books.update(id, update)
    res.status(202).json(updatedBook);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  const id = req.params.id;
  try {
    await Books.destroy(id);
    res.status(204).json(null);
  } catch (err) {
    next(err);
  }
}

module.exports = bookRoutes;
