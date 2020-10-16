const KoaRouter = require('koa-router');

const router = new KoaRouter();

/**
 * About page
 * @route GET /
 */
router.get('/', async function (ctx) {
	const PAGE_NAME = 'About - Our Background, Our Mission';

	return await ctx.render('about/index', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	});
});

/**
 * Team page
 * @route GET /team/[role]
 */
router.get('/team/:role?', async function (ctx) {
	const { role } = ctx.params;
	const team = require('../values/team.json');

	let PAGE_NAME;
	let indexName = (team.hasOwnProperty(role))? role: 'pioneers';

	const collection = Reflect.get(team, indexName) || undefined;

	PAGE_NAME = `${collection.name} Team`;
 
	return await ctx.render('about/team', {
	   PAGE_NAME, 
	   PAGE_ROUTE: ctx.url,
	   collection
	});
 });

module.exports = router;