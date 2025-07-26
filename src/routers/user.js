const express = require('express');
const User = require('../models/User');
const router = new express.Router();

// -- SIGNUP --
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;