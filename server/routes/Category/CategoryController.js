const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await prisma.category.create({
			data: {
				name
			}
		})
		res.json(category);
	}
	catch (error) {
		console.log(error);
	}
}

const getCategories = async (req, res) => {
	try {
		const categories = await prisma.category.findMany()
		res.json(categories);

	}
	catch (error) {
		console.log(error);
	}
}


module.exports = {
	createCategory,
	getCategories,
}