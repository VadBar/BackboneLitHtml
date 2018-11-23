const filtersController = require('../controllers/managerColumns.js');
const express = require('express');
const router = express.Router();
router.get('/',  filtersController.getAll);
router.get('/:id', filtersController.getById);
router.post('/', filtersController.create);
router.patch('/:id', filtersController.update);
module.exports = router;