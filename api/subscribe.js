const KoaRouter = require('koa-router');
const router = new KoaRouter();
const Subscriber = require('../models/Subscriber');

/**
 * New email subscription route
 * @route POST /api/subscribe
 */
router.post('/', async ctx => {
	const { email } = ctx.request.body;
	const userAgent = ctx.request.header['user-agent'] || undefined;

	/** @type {import('../models/Subscriber').SubscriberInstance} */
	let payload;

	// Undefined email
	if (!email) {
		ctx.response.status = 400; // Status 400
		return ctx.body = {
			message: "Require email address"
		};
	}

	// Check if user already subscribed
	if (await Subscriber.exists({ email })) {
		ctx.response.status = 200; // Status 200
		return ctx.body = {
			message: "Your email is already subscribed"
		};
	}

	// Create db payload
	payload = {
		email,
		userAgent
	}

	// New subscriber
	const newSubscriber = new Subscriber(payload);

	try {
		await newSubscriber.save(); 
	} catch (err) {
		ctx.response.status = 500; // Status 500
		return ctx.body = {
			message: "Error while email subscription process"
		};
	}

	ctx.response.status = 201; // Status 201
	return ctx.body = {
		message: "Your email subscribed"
	};
});

module.exports = router;