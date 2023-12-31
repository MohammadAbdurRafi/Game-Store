const Sequelize = require('sequelize');
const db = require('../config/database');
const { DataTypes } = Sequelize;

const User = db.define('users', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  full_name: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.TEXT, allowNull: false, unique: true },
  password: { type: DataTypes.TEXT, allowNull: false },
  username: { type: DataTypes.TEXT, unique: true },
  phone_number: { type: DataTypes.TEXT },
  address: { type: DataTypes.TEXT },
  is_active: { type: DataTypes.TEXT, defaultValue: 'Y' },
});

User.sync().then(() => {
  console.log('Users table has been created');
});

module.exports = User;
