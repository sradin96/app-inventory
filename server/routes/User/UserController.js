const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
	const { email, username, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	try {
		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hash,
				blocked: false
			}
		})
		res.header('Access-Control-Allow-Credentials', true);
		const token = jwt.sign({ userId: user.id }, SECRET_KEY);

		await prisma.userRoles.create({
			data: {
				userId: user.id,
				roleId: 2
			}
		})

		const cookieOptions = {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: false,
		}

		console.log(user, token);

		res.cookie('token', token, cookieOptions);
		res.cookie('role', 'user', cookieOptions)
		res.cookie('user', user.username, cookieOptions)
		res.cookie('userId', user.id, cookieOptions)

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

	if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
	res.header('Access-Control-Allow-Credentials', true);
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
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: false,
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
	res.cookie('user', userData.username, cookieOptions)
	res.cookie('userId', user.id, cookieOptions)

	res.json({ userData });
}

const updateUser = async (req, res) => {
	try {
		const { email, password, username, phone, address, city, zipcode } = req.body;
		const { id } = req.params;
		let updateData = {};

		if (email?.length) {
			updateData.email = email;
		}

		if (password?.length) {
			const hashedPassword = await bcrypt.hash(password, 10);
			updateData.password = hashedPassword;
		}

		if (username?.length) {
			updateData.username = username;
		}
		if (phone?.length) {
			updateData.phone = phone;
		}

		if (address?.length) {
			updateData.address = address;
		}

		if (city?.length) {
			updateData.city = city;
		}

		if (zipcode?.length) {
			updateData.zipcode = parseInt(zipcode);
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(id)
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
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        zipcode: true,
      },
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