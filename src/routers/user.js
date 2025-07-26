const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import bcrypt here

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

// -- LOGIN --
router.post('/users/login', async (req, res) => {
  try {
    // 1. Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: 'Unable to login' });
    }

    // 2. Compare the incoming password with the stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Unable to login' });
    }

    // 3. Generate a token if credentials are valid
    const token = await user.generateAuthToken();
    res.send({ user, token });

  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;