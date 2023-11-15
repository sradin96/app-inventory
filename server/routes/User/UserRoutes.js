const express = require('express');
const router = express.Router();
const userController = require('./UserController');

router.post('/register', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', userController.loginUser);
router.get('/user/:id', userController.getUserById);
router.put('/user-update/:id', userController.updateUser)

router.get('/user-profile', userController.authMiddleware, async (req, res) => {
	const userData = {
		email: req.user.email,
		username: req.user.name
	}
	res.json({ userData });
});

module.exports = router;