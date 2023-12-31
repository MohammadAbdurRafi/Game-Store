const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error getting users ', error });
  }
});

// Get a specific user
router.get('/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await User.findOne({ where: { id: `${user_id}` } });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error getting user ', error });
  }
});

// Add a user
router.post('/add', async (req, res) => {
  const { full_name, email, password, username, phone_number, address } =
    req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      username,
      phone_number,
      address,
    });
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error creating user ', error });
  }
});

// Update a user
router.put('/edit/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const { full_name, email, password, username, phone_number, address } =
    req.body;
  try {
    const user = await User.findOne({ where: { id: `${user_id}` } });

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    user.full_name = full_name;
    user.email = email;
    user.password = hashedPassword;
    user.username = username;
    user.phone_number = phone_number;
    user.address = address;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error updating user ', error });
  }
});

// Delete a user
router.delete('/delete/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findOne({ where: { id: `${user_id}` } });
    await user.destroy();
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error deleting game ', error });
  }
});

module.exports = router;
