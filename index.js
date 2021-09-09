const express = require("express");
const app = express();
const Joi = require("joi");
const Genres=require("./routes/genres")

app.use(express.json());
app.use("/api/genres", Genres)

app.get("/", (req, res) => {
  res.send("Hi, Could You Please Fuck Off");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
