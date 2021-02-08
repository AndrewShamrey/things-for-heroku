const { Router } = require("express");

const {
  getThings,
  getThing,
  saveThings,
  saveThing,
  updateThing
} = require('../services');

const api = Router();

api.get("/things", (req, res) => {
  getThings()
    .then(things => {
      res.json(things);
    })
    .catch((err) => {
      res.status(500);
      res.end("Access failed");
    });
});

api.get("/things/:id", (req, res) => {
  getThing(req.params.id)
    .then((thing) => {
      if (!thing) {
        res.status(404);
        res.end("Not found!");
      }
      res.json(thing);
    })
    .catch((err) => {
      res.status(500);
      res.end("Access failed");
    });
});

api.post("/things", (req, res) => {
  const body = req.body;
  if (!body.name || typeof body.name !== 'string') {
    res.status(400);
    res.end(`Param 'name' is required and should be 'String'`);
  } else {
    saveThing(body)
      .then(() => {
        res.status(201);
        res.end("New thing was added!");
      })
      .catch((err) => {
        res.status(500);
        res.end("Access failed");
      });
  }
});

api.put("/things/:id", (req, res) => {
  const body = req.body;
  if (!body.name || typeof body.name !== 'string') {
    res.status(400);
    res.end(`Param 'name' is required and should be 'String'`);
  } else {
    getThings()
      .then((things) => {
        const currentThing = things.find((item) => item.id === req.params.id);
        if (!currentThing) {
          res.status(404);
          res.end("Not found!");
        } else {
          updateThing(currentThing, body);
          saveThings(things).then(() => {
            res.status(200);
            res.end("Resource updated successfully!");
          });
        }
      })
      .catch((err) => {
        res.status(500);
        res.end("Access failed");
      });
  }
});

api.delete("/things/:id", (req, res) => {
  getThings()
  .then((things) => {
    const currentItem = things.find(item => item.id === req.params.id);
    if (!currentItem) {
      res.status(404);
      res.end("Not found!");
    } else {
      const index = things.indexOf(currentItem);
      things.splice(index, 1);
      saveThings(things).then(() => {
        res.status(200);
        res.end("Resource deleted successfully!");
      });
    }
  })
  .catch((err) => {
    res.status(500);
    res.end("Access failed");
  });    
});

module.exports = api;
