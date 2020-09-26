const KoaRouter = require('koa-router');
const router = new KoaRouter();
const Candidate = require('../models/Candidate');

router.post('/', async ctx => {
	const body = ctx.request.body;
	const userAgent = ctx.request.header['user-agent'] || undefined;

	/** @type {import('../models/Candidate').CandidateInstance} */
	let payload;

	// Null check
	if (!('githubUsername' in body && body.githubUsername.length > 0)) {
		ctx.response.status = 400;
		return ctx.body = {
			message: "Require github username"
		};
	}

	// Create db payload
	payload = {
		...body,
		userAgent
	};

	// New candidate
	const newCandidate = new Candidate(payload);

	try {
		await newCandidate.save();
	} catch (err) {
		ctx.response.status = 500;
		return ctx.body = {
			message: "Error while submitting data"
		};
	}

	ctx.response.status = 201;
	return ctx.body = {
		message: "Data submitted successfully"
	};
})

module.exports = router;