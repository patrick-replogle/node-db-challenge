const express = require("express");
const helmet = require("helmet");

const projectRouter = require("../projects/project-router.js");
const resourceRouter = require("../resources/resource-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occured. Please try again later."
  });
});

module.exports = server;
