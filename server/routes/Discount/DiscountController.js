const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const value = 2000;
// const dicount = 15;

// const dicountPrice = value * (dicount / 100);

// const price = value - dicountPrice;

const createDiscount = async (req, res) => {
	try {
		const { value } = req.body;
		const discount = await prisma.discount.create({
			data: {
				value
			}
		});
		res.json(discount);
	}
	catch (error) {
		console.log(error);
	}
};

const createItemDiscount = async (req, res) => {
	try {
		const { itemId } = req.params;
		const { discountValue } = req.body;
		const item = await prisma.item.findUnique({
			where: {
				id: parseInt(itemId)
			}
		})
		if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    let discount = await prisma.discount.findFirst({
      where: {
        value: discountValue,
      },
    });

    if (!discount) {
      discount = await prisma.discount.create({
        data: {
          value: discountValue,
        },
      });
    }

		const itemDiscount = await prisma.itemDiscount.create({
      data: {
        itemId: item.id,
        discountId: discount.id,
      },
    });

		const discountPrice = item.price * (discount.value / 100);
		const price = item.price - discountPrice;

		await prisma.item.update({
			where: {
				id: parseInt(itemId)
			},
			data: {
				...item.data,
				discountPrice: price
			}
		})

    res.json(itemDiscount);
	}
	catch (error) {
		console.log(error);
	}
}

const getDiscounts = async (req, res) => {
	try {
		const discounts = await prisma.discount.findMany();
		res.json(discounts)
	}
	catch (error) {
		console.log(error);
	}
};

module.exports = {
	createDiscount,
	getDiscounts,
	createItemDiscount
}