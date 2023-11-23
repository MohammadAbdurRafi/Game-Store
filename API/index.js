const express = require('express');
const cors = require('cors');
const gameRoute = require('./routes/games');

// Database
const db = require('./config/database');

// Test Database Connection
try {
  db.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.log(`DB Error: ${error}`);
}

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gameRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
