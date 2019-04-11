const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("should respond with 200 OK", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");

      expect(res.type).toBe("text/html");
    });

    it("should check for json", () => {
      return request(server)
        .get("/")
        .expect(/server is hot/i);
    });
  });
});
