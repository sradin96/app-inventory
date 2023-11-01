const express = require('express');
const router = express.Router();
const roleController = require('./RolesController');

router.get('/roles', roleController.getUserRoles);

module.exports = router;