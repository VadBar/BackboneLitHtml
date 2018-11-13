const bookController = require('../controllers/book.js');
const express = require('express');
const router = express.Router();
router.get('/',  bookController.getAll);
router.get('/:id', bookController.getById);
router.delete('/:id', bookController.remove);
router.post('/', bookController.create);
router.patch('/:id', bookController.update);
module.exports = router;