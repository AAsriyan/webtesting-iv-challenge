const db = require("../config/knexConfig.js");
const Hobbits = require("./hobbits-model.js");
const server = require("../api/server.js");
const request = require("supertest");

describe("hobbits model", () => {
  beforeEach(async () => {
    await db("hobbits").truncate();
  });

  describe("GET /hobbits", () => {
    it("should respond with a 200 OK", async () => {
      const res = await request(server).get("/api/hobbits");

      expect(res.status).toBe(200);
    });

    it("should respond with a 200 OK", async () => {
      await Hobbits.insert({ name: "frodo" });
      const res = await request(server).get("/api/hobbits/1");

      expect(res.status).toBe(200);
    });
  });

  describe("POST /hobbits", () => {
    it("should respond with a 201 OK", done => {
      //await Hobbits.insert({ name: "frodo" });

      request(server)
        .post("/api/hobbits")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201, done);

      // expect(res.status).toBe(201);
    });

    it("should insert the given hobbit", async () => {
      await Hobbits.insert({ name: "aragorn" });
      await Hobbits.insert({ name: "gandalf" });

      const hobbits = await Hobbits.get();

      expect(hobbits).toHaveLength(2);
    });

    it("should insert the provided hobbit", async () => {
      let hobbit = await Hobbits.insert({ name: "frodo" });
      expect(hobbit.name).toBe("frodo");

      hobbit = await Hobbits.insert({ name: "randy" });
      expect(hobbit.name).toBe("randy");
    });
  });
});
