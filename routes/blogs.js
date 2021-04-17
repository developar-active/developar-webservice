const KoaRouter = require('koa-router');

const router = new KoaRouter();
const blogs = require('../values/blogs.json');

/**
 * Blog page
 * @route GET /
 */
 router.get('/', async function (ctx) {
	const PAGE_NAME = 'Blogs';

	return await ctx.render('blogs/index', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url,
		blogs
	});
});

module.exports = router;
