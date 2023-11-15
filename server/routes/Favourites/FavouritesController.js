const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addToFavourite = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const existingFavourite = await prisma.favourites.findFirst({
      where: {
				userId: parseInt(userId),
				itemId: parseInt(itemId),
      },
    });

    if (existingFavourite) {
      await prisma.favourites.delete({
        where: {
          id: existingFavourite.id,
        },
      });
			return;
    }

    const newFavourite = await prisma.favourites.create({
      data: {
        itemId: parseInt(itemId),
        userId: parseInt(userId),
      },
    });

    res.json(newFavourite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFavouriteItems = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = parseInt(id);
		if(!userId) return;
		const favourites = await prisma.favourites.findMany({
			where: {
				userId
			}
		});

		const itemIds = favourites.map((favourite) => favourite.itemId);

		const items = await prisma.item.findMany({
			where: {
				id: {
					in: itemIds
				}
			}
		})
		res.json(items);
	}
	catch (error) {
		console.log(error);
	}
}

module.exports = {
	addToFavourite,
	getFavouriteItems
}