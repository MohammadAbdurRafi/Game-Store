const bcrypt = require('bcryptjs');
const { STATUS } = require('../utils/constants');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

const register = async (req, res) => {
  const { full_name, email, password, username, phone_number, address, role } =
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
      role,
    });
    res.status(201).json({ message: 'You have successfully registered', user });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({
      error:
        "Sorry, we didn't find any user that matches the email address given. If you haven't registered yet, please go through our registration page.",
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
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findOne({ where: { id: `${user_id}` } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).json({ message: 'Game deleted successfully', game });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, getUsers, deleteUser };
