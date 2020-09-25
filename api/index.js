const KoaRouter = require('koa-router');
const json = require('koa-json');
const api = new KoaRouter();
const SubscriberRouter = require('./subscribe');
const ContactRouter = require('./contact');

api.use(json());
api.use(
	'/subscribe', 
	SubscriberRouter.routes(), 
	SubscriberRouter.allowedMethods()
); // Use subscriber route

api.use(
	'/contact',
	ContactRouter.routes(),
	ContactRouter.allowedMethods()
); // Use contact router

/**
 * Testing route
 * @route GET /
 */
api.get('/test', async ctx => {
	ctx.body = {
		message: 'It\'s work'
	}
});

/**
 * Team route
 * @route GET /team/[role?]
 */
api.get('/team/:role?', async ctx => {
	const role = ctx.params.role || '';
	const team = require('../values/team.json');
	let response;

	if (role && role.length > 0) {
		response = Reflect.get(team, role) || null;
	} 
	else {
		response = team;
	}

	if (!response) {
		ctx.response.status = 404;
	}

	console.log(response);

	return ctx.body = response || {};
})

module.exports = api;