const express = require('express');
const router = express.Router();
const eventController = require('./EventController');

router.post('/create-event', eventController.createEvent);
router.get('/events', eventController.getEvents);

module.exports = router;