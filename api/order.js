const KoaRouter = require('koa-router');
const router = new KoaRouter();
const Order = require('../models/Order');

/**
 * New order route
 * @route POST /api/order
 */
router.post('/', async ctx => {
	const body = ctx.request.body;
	const userAgent = ctx.request.header['user-agent'] || undefined;

	/** @type {import('../models/Order').OrderInstance} */
	let payload;

	// Create db payload
	payload = {
		...body,
		userAgent
	}

	// New order
	const newOrder = new Order(payload);

	// Save order
	try {
		await newOrder.save();
	} catch (err) {
		ctx.response.status = 500; // Status 500
		return ctx.body = {
			message: 'Error while order submition'
		}
	}

	ctx.response.status = 201; // Status 201
	return ctx.body = {
		message: 'Order submited'
	};
})

module.exports = router;