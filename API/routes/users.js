const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { STATUS } = require('../utils/constants');
const generateToken = require('../utils/generateToken');

const User = require('../models/User');

// Create a User
router.post('/register', async (req, res) => {
  const { full_name, email, password, username, phone_number, address } =
    req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      username,
      phone_number,
      address,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({
      error:
        "Sorry we did not find any user that matches with this email address. If you haven't registered, please go through our registration page.",
    });
  }

  if (user.is_active === STATUS.INACTIVE) {
    return res.status(400).json({
      error:
        'Sorry, your account is not active. Please contact our customer service.',
    });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      phone_number: user.phone_number,
      address: user.address,
      is_active: user.is_active,
      token: generateToken(user.id),
    });
  } else {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }
});

module.exports = router;
