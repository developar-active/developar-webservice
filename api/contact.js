const KoaRouter = require('koa-router');
const router = new KoaRouter();
const Contact = require('../models/Contact');

router.post('/', async ctx => {
	const { name, email, message } = ctx.request.body;
	const userAgent = ctx.request.header['user-agent'] || undefined;

	/** @type {import('../models/Contact').ContactInstance} */
	let payload;

	// Null check
	if (!(name && name.length > 0 && email && email.length > 0 && message && message.length > 0)) {
		ctx.response.status = 400; // Status 400
		return ctx.body = {
			message: "Incomplete data"
		};
	}

	// Create db payload
	payload = {
		name,
		email, 
		message,
		userAgent
	};

	// New contact
	const newContact = new Contact(payload);

	// Save contact
	try {
		await newContact.save();
	} catch (err) {
		ctx.response.status = 500; // Error
		return ctx.body = {
			message: "Error while contact submition"
		};
	}

	ctx.response.status = 201; // Status 201
	return ctx.body = {
		message: "Contact submited"
	};
})

module.exports = router;