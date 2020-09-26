const KoaRouter = require('koa-router');

const router = new KoaRouter();

/**
 * Career page
 * @route GET /career
 */
router.get('/', async ctx => {
   const PAGE_NAME = 'Career';

   return await ctx.render('career', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   })
})

/**
 * Jobs page
 * @route GET /career/jobs
 */
router.get('/jobs', async ctx => {
   const PAGE_NAME = 'Jobs';
   const jobs = require('../values/jobs.json');

   return await ctx.render('jobs/index', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      jobs
   })
})

router.get('/jobs/success', async ctx => {
   const PAGE_NAME = 'Thanks for apply';

   return ctx.render('jobs/success', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   })
})

/**
 * Job's post detail
 * @route GET /career/jobs/:postId
 */
router.get('/jobs/:postId', async ctx => {
   const { postId } = ctx.params;

   let PAGE_NAME;
   let post;
   const jobs = require('../values/jobs.json');

   post = jobs.find(job => job.id === postId) || null;

   if (!post) {
      return ctx.redirect('/career/jobs');
   }

   PAGE_NAME = `Apply for ${post.name.toLocaleLowerCase()}`;

   return await ctx.render('jobs/post', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      post
   })
})

module.exports = router;