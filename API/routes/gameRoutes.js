const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const { storage } = require('../utils/multer');
const multer = require('multer');
const multerMiddleware = multer({ storage: storage });

router.get('/', gameController.getAllGames);
router.get('/:game_id', gameController.getGameById);
router.post(
  '/add',
  [protect, multerMiddleware.single('picture')],
  asyncHandler(gameController.createGame)
);
router.put('/:game_id', [protect], gameController.updateGame);
router.delete('/:game_id', [protect], gameController.deleteGame);

module.exports = router;
