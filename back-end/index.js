const express = require("express");

module.exports = () => {
  const app = express();

  app.get("/", (req, res) => res.send({ message: "Hello World!" }));
};
