const KoaRouter = require('koa-router');

const router = new KoaRouter();

/**
 * Blog page
 * @route GET /
 */
 router.get('/', async function (ctx) {
	const PAGE_NAME = 'Blogs';

	return await ctx.render('blogs/index', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	});
});

module.exports = router;
