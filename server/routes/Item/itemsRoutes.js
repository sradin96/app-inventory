const express = require('express');
const router = express.Router();
const multer = require('multer')
const itemController = require('./itemController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/item', upload.array('image'), itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/item/:id', itemController.getItemById);
router.get('/items/search', itemController.getItemsByQuery);

module.exports = router;