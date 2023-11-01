const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
	const { email, username, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	try {
		const user = await prisma.user.create({
				data: {
						email,
						username,
						password: hash
				}
		})

		const token = jwt.sign({ userId: user.id }, SECRET_KEY);

		await prisma.userRoles.create({
			data: {
				userId: user.id,
				roleId: 2
			}
		})

		console.log(user, token);

		res.json({ user, token });
	} catch (error) {
		res.status(500).json({ error: 'Something Went Wrong!' })
	}
}

const getUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany()
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Something Went Wrong!' });
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: { email },
		include: { userRoles: true }
	});
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const cookieOptions = {
		maxAge: 24 * 60 * 60 * 1000
	}

	const userData = {
		username: user.username,
		email: user.email
	}

	const token = jwt.sign({ userId: user.id }, SECRET_KEY);

	const roleName = await prisma.roles.findUnique({
		where: {
			id: user.userRoles[0].roleId
		}
	});

	res.cookie('token', token, cookieOptions);
	res.cookie('role', roleName.name, cookieOptions)

	res.json({ userData });
}

const updateUser = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		const currentEmail = req.params.email;
		let updateData = {};

		if (email) {
			updateData.email = email;
		}

		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			updateData.password = hashedPassword;
		}

		if (name) {
			updateData.name = name;
		}

		const updatedUser = await prisma.user.update({
			where: {
				email: currentEmail
			},
			data: updateData
		});

		res.json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};

const getUserById = async (req, res) => {
	try {
		const userId = parseInt(req.params.id);

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

const authMiddleware = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({ message: 'Authorization token missing' });
	}

	try {
		const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
		const userId = decoded.userId;

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

module.exports = {
	createUser,
	getUsers,
	loginUser,
	updateUser,
	getUserById,
	authMiddleware
}