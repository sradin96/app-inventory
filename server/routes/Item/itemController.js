const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createItem = async (req, res) => {
	try {
		const { name, quantity, description } = req.body;
		const item = await prisma.item.create({
			data: {
				name,
				quantity,
				description
			}
		});
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: `Can't create item!` });
	}
}

const getItems = async (req, res) => {
	try {
		const items = await prisma.item.findMany();
		res.json(items)
	} catch (error) {
		res.status(500).json({ error: `Can't return all items!` });
	}
}

const getItemById = async (req, res) => {
	try {
		const itemId = parseInt(req.params.id);
		const item = await prisma.item.findUnique({
			where: { id: itemId },
		});
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: `Can't return  specific item!` });
	}
}

const getItemsByQuery = async (req, res) => {
	try {
		const { name, quantity } = req.query;

		const filter = {};

		if (name) {
			filter.name = {
				contains: name,
				mode: 'insensitive'
			};
		}

		if (quantity) {
			filter.quantity = {
				lte: parseInt(quantity)
			};
		}

		if (Object.keys(filter).length === 0) {
			const items = await prisma.item.findMany();
			res.json(items);
		} else {
			const items = await prisma.item.findMany({
				where: filter,
			});
			res.json(items);
		}
	} catch (error) {
		res.status(500).json({ error: 'Error occurred while searching items' });
	}
};

module.exports = {
	createItem,
	getItems,
	getItemById,
	getItemsByQuery
}