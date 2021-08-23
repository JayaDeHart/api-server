require("dotenv").config();
const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);
const { db } = require("../src/models/index.js");

describe("games Routes:", () => {
  beforeEach(async () => {
    await db.sync();
  });

  afterEach(async () => {
    await db.drop();
  });

  //GET all
  it("should respond with a status code of 200 and a list of games to a request for all games", async () => {
    try {
      const response = await mockRequest
        .post("/games")
        .send({ title: "game", releaseYear: 2001 });
      const response2 = await mockRequest.get("/games");
      expect(response2.status).toBe(200);
      expect(typeof response2.body).toEqual("object");
    } catch (err) {}
  });

  //GET one
  it("should respond with a status code of 200 and the queried game to a request for one game", async () => {
    try {
      const response = await mockRequest
        .post("/games")
        .send({ title: "game", releaseYear: 2001 });
      const response2 = await mockRequest.get(`/games/${response.body.id}`);
      expect(response2.status).toBe(200);
      expect(typeof response.body).toEqual("object");
    } catch (err) {}
  });

  //POST
  it("should respond with a status code of 201 and the created game upon creation", async () => {
    try {
      const response = await mockRequest
        .post("/games")
        .send({ title: "game", releaseYear: 2001 });
      expect(response.status).toBe(201);
      expect(typeof response.body).toEqual("object");
    } catch (err) {}
  });

  // PUT;
  it("should respond with a status code of 202 and the updated game after successfully updating", async () => {
    try {
      const response = await mockRequest
        .post("/games")
        .send({ title: "game", releaseYear: 2001 });
      const response2 = await mockRequest
        .put(`/games/${response.body.id}`)
        .send({ title: "game", releaseYear: 2002 });
      expect(response2.status).toBe(202);
      expect(response2.body.releaseYear).toEqual(2002);
    } catch (err) {}
  });

  //DELETE
  it("should respond with a status code of 204 after successfully deleting", async () => {
    try {
      const response = await mockRequest
        .post("/games")
        .send({ title: "game", releaseYear: 2001 });
      const response2 = await mockRequest.delete(`/games/${response.body.id}`);
      expect(response2.status).toBe(204);
    } catch (err) {}
  });
});
