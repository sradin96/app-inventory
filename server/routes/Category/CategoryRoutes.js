const express = require('express');
const router = express.Router();
const categoryController = require('./CategoryController');

router.post('/create-category', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);

module.exports = router;