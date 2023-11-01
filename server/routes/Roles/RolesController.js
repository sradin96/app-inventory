const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserRoles = async (req, res) => {
	const { id } = req.body;
	try {
		const roles = await prisma.userRoles.findUnique({
			where: {
				userId: id
			}
		});
		res.json(roles);
	} catch (error) {
		res.status(500).json({ error: 'Something Went Wrong!' });
	}
}

module.exports = {
	getUserRoles
}