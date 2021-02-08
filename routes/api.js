const { Router } = require("express");
const v1api = require("./v1api");

const api = Router();

api.use("/v1", v1api);

api.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = api;
