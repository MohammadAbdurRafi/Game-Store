const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

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

app.use('/pictures', express.static('pictures'));

// Routes
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

// Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
