const Sequelize = require('sequelize');
const db = require('../config/database');
const { DataTypes } = Sequelize;
const User = require('./User');

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
  is_active: { type: DataTypes.TEXT },
  quantity: { type: DataTypes.INTEGER },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

Game.sync().then(() => {
  console.log('Games table has been created');
});

module.exports = Game;
