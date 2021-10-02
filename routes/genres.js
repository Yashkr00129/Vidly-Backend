const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

const Genre = new mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
  })
);

router.use(express.json());

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) return res.send("Fuck Off You Moron This Id Doesnt Exist");
  res.send(genre);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    const genre = {
      id: genres.length + 1,
      name: req.body.name,
    };
    genres.push(genre);
    res.send(genre);
  }
});
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Fuck Off");
    return;
  }
  const schema = { name: Joi.string().min(3).required() };
  const result = Joi.validate(req.body, schema);
  console.log(result);
  if (result.error)
    return res.status(400).send("Send A Fucking Real Genre, You Moron");
  genre.name = req.body.name;
  res.send(genre);
});
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Fuck Off");
    return;
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1), res.send(genre);
});

module.exports = router;
