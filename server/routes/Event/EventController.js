const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
	try {
		const { name, startDate, endDate } = req.body;
		const event = await prisma.event.create({
			data: {
				name,
				startDate,
				endDate
			}
		});
		res.json(event);
	}
	catch (error) {
		console.log(error);
	}
}

const getEvents = async (req, res) => {
	try {
		const events = await prisma.event.findMany();
		res.json(events);
	}
	catch (error) {
		console.log(error);
	}
}

module.exports = {
	createEvent,
	getEvents
}