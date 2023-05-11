const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const comicRoutes = require("./routes/comics");
app.use(comicRoutes);
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
const userRoutes = require("./routes/User");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started 🚀");
});
