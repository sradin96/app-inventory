const express = require('express');
const router = express.Router();
const itemController = require('./itemController');

router.post('/item', itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/item/:id', itemController.getItemById);
router.get('/items/search', itemController.getItemsByQuery);

module.exports = router;