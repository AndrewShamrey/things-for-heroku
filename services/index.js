const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pathToFile = path.join(__dirname, "../allThings.json");

exports.getThings = function () {
  return readFile(pathToFile).then(JSON.parse);
};

exports.getThing = function (id) {
  return exports.getThings().then((things) => {
    return things.find((item) => item.id === id);
  });
};

exports.saveThings = function (things) {
  return writeFile(pathToFile, JSON.stringify(things));
};

exports.saveThing = function (thing) {
  return exports.getThings().then((things) => {
    const ids = things
      .slice()
      .map(item => item.id)
      .sort((a, b) => a - b);
    let id;
    if (thing.id && !ids.includes(thing.id)) {
      id = thing.id + "";
    } else {
      if (ids.length > 0) {
        id = ids[ids.length - 1] + "1";
      } else {
        id = "1";
      }
    }
    const newThing = Object.assign({}, thing, { id });

    return exports.saveThings(things.concat(newThing));
  });
};

exports.updateThing = function (oldThing, newThing) {
  if (newThing.id) {
    delete newThing.id;
  }
  const newObject = Object.assign(oldThing, newThing);
  const newKeys = Object.keys(newThing);
  for (key in newObject) {
    if (!newKeys.includes(key) && key !== "id") {
      delete newObject[key];
    }
  }
};
