const KoaRouter = require('koa-router');

const router = new KoaRouter();

/**
 * Career page
 * @route GET /
 */
router.get('/', async function (ctx) {
   const PAGE_NAME = 'Careers';

   return await ctx.render('career', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   });
});

/**
 * Jobs page
 * @route GET /jobs
 */
router.get('/jobs', async function (ctx) {
   const PAGE_NAME = 'Jobs';
   const jobs = require('../values/jobs.json');

   return await ctx.render('jobs/index', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      jobs
   });
});

router.get('/jobs/success', async function (ctx) {
   const PAGE_NAME = 'Thanks for apply';

   return ctx.render('jobs/success', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   });
});

/**
 * Job's post detail
 * @route GET /jobs/[postId]
 */
router.get('/jobs/:postId', async function (ctx) {
   const { postId } = ctx.params;

   let PAGE_NAME;
   let post;
   const jobs = require('../values/jobs.json');

   post = jobs.find(function (job) {
      return job.id === postId;
   }) || undefined;

   if (!post) {
      ctx.response.status = 404;
      return ctx.render('codes/404', {
         PAGE_NAME: 'Job not found',
         PAGE_ROUTE: ctx.url
      });
   }

   PAGE_NAME = `Apply for ${post.name.toLocaleLowerCase()}`;

   return await ctx.render('jobs/post', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      post
   });
});

module.exports = router;