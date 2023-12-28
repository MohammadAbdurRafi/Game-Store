const Sequelize = require('sequelize');
const db = require('../config/database');
const { DataTypes } = Sequelize;

const Game = db.define('games', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  picture: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(4, 2) },
  isActive: { type: DataTypes.BOOLEAN },
  quantity: { type: DataTypes.INTEGER },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Game.sync().then(() => {
  console.log('Games table has been created');
});

module.exports = Game;
