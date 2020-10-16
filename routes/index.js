const KoaRouter = require('koa-router');
const OrderRouter = require('./order');

const router = new KoaRouter();

// Use /order route
router.use('/order', OrderRouter.routes(), OrderRouter.allowedMethods());

/**
 * Home page
 * @route GET /
 */
router.get('/', async function (ctx) {
   const PAGE_NAME = 'Home';

   return await ctx.render('index', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   });
});

/**
 * Services page 
 * @route GET /services
 */
router.get('/services', async function (ctx) {
   const PAGE_NAME = 'Services';

   return await ctx.render('services', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   });
});

router.get('/pricing', async function (ctx) {
   const PAGE_NAME = 'Pricing';
   const plans = Object.values(require('../values/plans.json'));

   return await ctx.render('pricing', {
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      plans
   });
});

/**
 * Contact page
 * @route GET /contact
 */
router.get('/contact', async function (ctx) {
   const PAGE_NAME = 'Contact';

   return await ctx.render('contact', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   });
});

/**
 * Privacy page
 * @route GET /privacy
 */
router.get('/privacy', async function (ctx) {
   const PAGE_NAME = 'Privacy';
   
   return await ctx.render('privacy', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   });
});

/**
 * Terms page
 * @route GET /terms
 */
router.get('/terms', async function (ctx) {
   const PAGE_NAME = 'Terms of Service';

   return await ctx.render('terms', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   });
});

module.exports = router;