const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const hobbitsRouter = require("../connectors/hobbits-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/hobbits", hobbitsRouter);

server.get("/", (req, res) => {
  res.send("Server is hot!");
});

module.exports = server;
