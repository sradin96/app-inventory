const express = require('express');
const router = express.Router();
const favouritesController = require('./FavouritesController');

router.post('/add-to-favourite', favouritesController.addToFavourite);
router.get('/favourite-items/:id', favouritesController.getFavouriteItems);

module.exports = router;