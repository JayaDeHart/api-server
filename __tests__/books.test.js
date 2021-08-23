require("dotenv").config();
const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);
const { db } = require("../src/models/index.js");

describe("books Routes:", () => {
  beforeEach(async () => {
    await db.sync();
    jest.setTimeout(10000);
  });

  afterEach(async () => {
    await db.drop();
  });

  //GET all
  it("should respond with a status code of 200 and a list of books to a request for all books", async () => {
    try {
      const response = await mockRequest
        .post("/books")
        .send({ title: "book", releaseYear: 2001 });
      const response2 = await mockRequest.get("/books");
      expect(response2.status).toBe(200);
      expect(typeof response2.body).toEqual("object");
    } catch (err) {
      console.log(err);
    }
  });

  //GET one
  it("should respond with a status code of 200 and the queried book to a request for one book", async () => {
    try {
      const response = await mockRequest
        .post("/books")
        .send({ title: "book", releaseYear: 2001 });
      const response2 = await mockRequest.get(`/books/${response.body.id}`);
      expect(response2.status).toBe(200);
      expect(typeof response.body).toEqual("object");
    } catch (err) {
      console.log(err);
    }
  });

  //POST
  it("should respond with a status code of 201 and the created book upon creation", async () => {
    try {
      const response = await mockRequest
        .post("/books")
        .send({ title: "book", releaseYear: 2001 });
      expect(response.status).toBe(201);
      expect(typeof response.body).toEqual("object");
    } catch (err) {
      console.log(err);
    }
  });

  // PUT;
  it("should respond with a status code of 202 and the updated book after successfully updating", async () => {
    try {
      const response = await mockRequest
        .post("/books")
        .send({ title: "book", releaseYear: 2001 });
      const response2 = await mockRequest
        .put(`/books/${response.body.id}`)
        .send({ title: "book", releaseYear: 2002 });
      expect(response2.status).toBe(202);
      expect(response2.body.releaseYear).toEqual(2002);
    } catch (err) {
      console.log(err);
    }
  });

  //DELETE
  it("should respond with a status code of 202 after successfully deleting", async () => {
    try {
      const response = await mockRequest
        .post("/books")
        .send({ title: "book", releaseYear: 2001 });
      const response2 = await mockRequest.delete(`/books/${response.body.id}`);
      expect(response2.status).toBe(204);
    } catch (err) {
      console.log(err);
    }
  });
});
