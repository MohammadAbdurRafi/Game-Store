const Sequelize = require('sequelize');
const db = require('../config/database');

const Game = db.define('games', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  picture: { type: Sequelize.STRING },
  price: { type: Sequelize.DOUBLE },
  isActive: { type: Sequelize.BOOLEAN },
  quantity: { type: Sequelize.INTEGER },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

Game.sync().then(() => {
  console.log('Games table has been created');
});

module.exports = Game;
