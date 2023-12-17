const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../config/database');
const Game = require('../models/Game');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pictures');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`);
  },
});

const getExtension = (mimetype) => {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    case 'image/jpeg':
      return '.jpeg';
    case 'image/jpg':
      return '.jpg';
  }
};

const app = express();
const multerMiddleware = multer({ storage: storage });

app.use('/pictures', express.static('pictures'));

// Get all the games
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error getting games', error });
  }
});

// Get a specific game
router.get('/:game_id', async (req, res) => {
  try {
    const game_id = req.params.game_id;
    const result = await Game.findOne({ where: { id: `${game_id}` } });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error getting game', error });
  }
});

// Add a game
router.post('/add', multerMiddleware.single('picture'), async (req, res) => {
  const { name, description, picture, price, isActive, quantity } = req.body;
  let errors = [];

  //   Validate Fields
  if (!name) {
    errors.push({ message: 'Please add a name' });
  }
  if (!description) {
    errors.push({ message: 'Please add a description' });
  }
  if (!picture) {
    errors.push({ message: 'Please add a picture' });
  }
  if (!price) {
    errors.push({ message: 'Please add a price' });
  }
  if (!isActive) {
    errors.push({ message: 'Please check if the game is active' });
  }
  if (!quantity) {
    errors.push({ message: 'Please add a quantity' });
  }

  //   Check for errors
  if (errors.length > 0) {
    res.status(500).json({ message: errors });
  } else {
    try {
      const game = await Game.create({
        name,
        description,
        picture,
        price,
        isActive,
        quantity,
      });
      res.json({ message: 'Game created successfully', game });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Error creating game', error });
    }
  }
});

// Update a game
router.put(
  '/:game_id',
  multerMiddleware.single('picture'),
  async (req, res) => {
    try {
      const game_id = req.params.game_id;
      const game = await Game.findOne({ where: { id: `${game_id}` } });

      const { name, description, picture, price, isActive, quantity } =
        req.body;

      game.name = name;
      game.description = description;
      game.picture = picture;
      game.price = price;
      game.isActive = isActive;
      game.quantity = quantity;

      await game.save();
      res.json({ message: 'Game updated successfully', game });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Error updating game', error });
    }
  }
);

router.delete('/:game_id', async (req, res) => {
  try {
    const game_id = req.params.game_id;
    const game = await Game.findOne({ where: { id: `${game_id}` } });
    await game.destroy();
    res.json({ message: 'Game deleted successfully', game });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error deleting game', error });
  }
});

module.exports = router;