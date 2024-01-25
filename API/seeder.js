const dotenv = require('dotenv');
const User = require('./models/User');
const Game = require('./models/Game');
const users = require('./data/users');
const games = require('./data/games');

// Database
const db = require('./config/database');

// Test Database Connection
try {
  db.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.log(`DB Error: ${error}`);
}

const importData = async () => {
  try {
    // Clean the tables of any previous data
    await User.destroy({ where: {} });
    await Game.destroy({ where: {} });

    // Bulk create the users
    await User.bulkCreate(users);
    await Game.bulkCreate(games);

    console.log('Data Imported...');
    process.exit();
  } catch (error) {
    console.log(`Data Import Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clean the tables of all data
    await User.destroy({ where: {} });
    await Game.destroy({ where: {} });

    console.log('Data Destroyed...');
    process.exit();
  } catch (error) {
    console.log(`Data Destroy Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
