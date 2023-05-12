const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//
//   ======SIGNUP======
//
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      res.status(409).json({ message: "L'adresse e-mail est déjà utilisé" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);
      const newUser = new User({
        email: email,
        username: username,
        hash: hash,
        token: token,
        salt: salt,
      });
      await newUser.save();

      res.status(201).json({
        email: newUser.email,
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
//   ======LOGIN======
//

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (email && password) {
      if (existingUser === null) {
        return res.status(401).json({ message: "Aucun compte trouvé" });
      }

      const newHash = SHA256(password + existingUser.salt).toString(encBase64);

      if (newHash !== existingUser.hash) {
        return res.status(401).json({ message: "Aucun compte trouvé" });
      }
      res.status(201).json({
        _id: existingUser._id,
        token: existingUser.token,
        account: existingUser.account,
      });
    } else {
      res.status(400).json({ message: "Veuillez renseigner les champs" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
