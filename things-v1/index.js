require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan("short"));
app.use(cors());

const api = require("./routes/api");

app.use("/api", api);

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
