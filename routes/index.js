const KoaRouter = require('koa-router');
const CareerRouter = require('./career');
const OrderRouter = require('./order');

const router = new KoaRouter();

// Use /career route
router.use('/career', CareerRouter.routes(), CareerRouter.allowedMethods());

// Use /order route
router.use('/order', OrderRouter.routes(), OrderRouter.allowedMethods());

/**
 * Home page
 * @route GET /
 */
router.get('/', async ctx => {
   const PAGE_NAME = 'Home';

   return await ctx.render('index', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   })
})

/**
 * Services page 
 * @route GET /services
 */
router.get('/services', async ctx => {
   const PAGE_NAME = 'Services';

   return await ctx.render('services', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   })
})

router.get('/pricing', async ctx => {
   const PAGE_NAME = 'Pricing';
   let plans;
   plans = require('../values/plans.json');

   if (typeof plans === 'object' && !Array.isArray(plans)) {
      plans = Object.values(plans);
   }

   return await ctx.render('pricing', {
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      plans
   })
})

/**
 * Contact page
 * @route GET /contact
 */
router.get('/contact', async ctx => {
   const PAGE_NAME = 'Contact';

   return await ctx.render('contact', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   })
})

/**
 * About page
 * @route GET /about
 */
router.get('/about', async ctx => {
   const PAGE_NAME = 'About - Our Background, Our Mission';

   return await ctx.render('about', {
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
   })
})

/**
 * Team page
 * @route GET /team
 */
router.get('/team/:role?', async ctx => {
   const { role } = ctx.params;
   const team = require('../values/team.json');
   let PAGE_NAME;
   let index;
   let collection;

   switch (role) {
      case 'pioneers':
      default:
         index = 'pioneers';
         break;
      case 'developers':
         index = 'developers';
         break;
      case 'dm':
         index = 'designMarketing';
         break;
   }

   collection = team[index];

   PAGE_NAME = `${collection.name} Team`;

   return await ctx.render('team', {
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      collection
   })
})

/**
 * Privacy page
 * @route GET /privacy
 */
router.get('/privacy', async ctx => {
   const PAGE_NAME = 'Privacy';
   
   return await ctx.render('privacy', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   });
})

/**
 * Terms page
 * @route GET /terms
 */
router.get('/terms', async ctx => {
   const PAGE_NAME = 'Terms';

   return await ctx.render('terms', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   });
})

module.exports = router;