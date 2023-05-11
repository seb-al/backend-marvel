const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get(
  "/comics",

  async (req, res) => {
    try {
      const title = req.query.title || "";
      const skip = req.query.skip || "";

      const result = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}`
      );

      res.status(200).json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/comics/:characterId",

  async (req, res) => {
    try {
      const characterid = req.params.characterId;
      const result = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${characterid}?apiKey=${process.env.API_KEY}`
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
router.get(
  "/comic/:comicid",

  async (req, res) => {
    try {
      const comicid = req.params.comicid;
      const result = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${comicid}?apiKey=${process.env.API_KEY}`
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
module.exports = router;
