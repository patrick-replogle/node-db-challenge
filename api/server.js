const express = require("express");
const helmet = require("helmet");

const resourceRouter = require("../resources/resource-router.js");
const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/resources", resourceRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occured. Please try again later."
  });
});

module.exports = server;
