const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get(
  "/characters",

  async (req, res) => {
    try {
      const name = req.query.name || "";
      const skip = req.query.skip || "";

      const result = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}`
      );

      res.status(200).json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/character/:characterId",

  async (req, res) => {
    try {
      const characterid = req.params.characterId;
      const result = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${characterid}?apiKey=${process.env.API_KEY}`
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;