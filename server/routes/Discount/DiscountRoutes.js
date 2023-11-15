const express = require('express');
const router = express.Router();
const discountController = require('./DiscountController');

router.post('/create-discount', discountController.createDiscount);
router.get('/discounts', discountController.getDiscounts);
router.post('/item-discount/:itemId', discountController.createItemDiscount);

module.exports = router;