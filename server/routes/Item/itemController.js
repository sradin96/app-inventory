const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createItem = async (req, res) => {
	try {
		const { name, quantity, description, price, brand, categoryName, image } = req.body;
    const images = req.files.map((file) => file.buffer);

		console.log(images);

		const item = await prisma.item.create({
			data: {
				name,
				quantity: parseInt(quantity),
				description,
				price: parseInt(price),
				brand,
				discountPrice: parseInt(0),
				image: images,
				deleted: false
			}
		});
		const category = await prisma.category.findFirst({
			where: {
				name: categoryName
			}
		})
		await prisma.itemCategory.create({
			data: {
				itemId: item.id,
				categoryId: category.id
			}
		})
		res.json(item);
		console.log(item);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `Can't create item!`, error });
	}
}

const updateItemPrice = async (req, res) => {
	try {
		const itemId = req.params.itemId;
		const { discount } = req.body;
		const item = await prisma.item.findUnique({
			where: {
				id: itemId
			}
		})
		const price = item.price;
		const updateItem = await prisma.item.update({
			where: {
				id: itemId
			},
			data: {
				discountPrice: 1
			}
		})
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
		const { name, page, sort } = req.query;
		const perPage = 3;

		const filter = {};

		if (name) {
      filter.OR = [
        {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        },
        {
          brand: {
            contains: name,
            mode: 'insensitive'
          }
        }
      ];
    }

		const skip = page ? (page - 1) * perPage : 0;
    const take = perPage ? parseInt(perPage) : 10;

		let orderBy = {};

		if (sort === 'lowToHigh') {
			orderBy.price = 'asc';
		} else if (sort === 'highToLow') {
			orderBy.price = 'desc';
		} else if (sort === 'nameAtoZ') {
			orderBy.name = 'asc';
		} else if (sort === 'nameZtoA') {
			orderBy.name = 'desc';
		} else if (sort === 'rating') {
			orderBy.rating = 'desc';
		}

		if (Object.keys(filter).length === 0) {
			const items = await prisma.item.findMany();
			res.json(items);
		} else {
			const items = await prisma.item.findMany({
				where: filter,
				include: {
					itemCategory: {
						select: {
              category: true
            }
					}
				},
				skip,
				take,
				orderBy
			});
			const totalItems = await prisma.item.count({
        where: filter
      });
      res.json({ items, totalItems });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error occurred while searching items' });
	}
};

module.exports = {
	createItem,
	getItems,
	getItemById,
	getItemsByQuery,
}