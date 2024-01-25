const Game = require('../models/Game');

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getGameById = async (req, res) => {
  try {
    const game_id = req.params.game_id;
    const result = await Game.findOne({ where: { id: `${game_id}` } });
    if (!result) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(result);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createGame = async (req, res) => {
  const { name, description, price, is_active, quantity, user_id } = req.body;
  const picture = req.file.path.replace('\\', '/');

  try {
    const game = await Game.create({
      name,
      description,
      picture,
      price,
      is_active,
      quantity,
      user_id,
    });
    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateGame = async (req, res) => {
  const game_id = req.params.game_id;
  const { name, description, picture, price, is_active, quantity, user_id } =
    req.body;

  try {
    const game = await Game.findOne({ where: { id: `${game_id}` } });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    game.name = name;
    game.description = description;
    game.picture = picture;
    game.price = price;
    game.is_active = is_active;
    game.quantity = quantity;
    game.user_id = user_id;

    await game.save();
    res.json({ message: 'Game updated successfully', game });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteGame = async (req, res) => {
  const game_id = req.params.game_id;

  try {
    const game = await Game.findOne({ where: { id: `${game_id}` } });

    if (!game) {
      return res.status(400).json({ error: 'Game not found' });
    }

    await game.destroy();
    res.status(204).json({ message: 'Game deleted successfully', game });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
