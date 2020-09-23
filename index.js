/**
 * Load env variables for local development
 * @local
 */
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

// Load
const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const serve = require('koa-static');
const render = require('koa-ejs');
const fs = require('fs');

// Initiate
const app = new Koa(); // Koa instance
const router = new KoaRouter(); // Koa router instance
const PORT = process.env.PORT || 4000; // Server PORT

// Setups
app
   .use(router.routes())
   .use(router.allowedMethods()) // Router

app.use(serve(path.join(__dirname, 'static'))); // Config static assets

render(app, {  // EJS Template rendering
   root: path.join(__dirname, 'views'),
   viewExt: 'ejs',
   layout: 'layout',
   cache: false,
   debug: false
})

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
 * Client script file
 * @route GET /app.js
 */
router.get('/app.js', async ctx => {
   let content;
   try {
      content = fs.readFileSync(path.join(__dirname, 'static/app.js'), 'utf8');
   } catch (err) {
      ctx.status = 400;
      return ctx.body = "Can't get /app.js";
   }

   ctx.res.setHeader('Content-Type', 'application/javascript');

   return ctx.body = content;
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
   plans = require('./values/plans.json');

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
 * Order Page
 * @route GET /order/:planId
 */
router.get('/order/:planId', async ctx => {
   const { planId } = ctx.params;
   const plans = require('./values/plans.json');
   let PAGE_NAME;
   let index;
   let plan;

   switch((planId || '').toLowerCase()) {
      case 'static-website':
         index = 'static';
         break;
      case 'dynamic-website':
         index = 'dynamic';
         break;
      case 'ecommerce':
         index = 'eCommerce';
         break;
      case 'mobile-app':
         index = 'mobileApp';
         break;
      case 'digital-marketing':
         index = 'digitalMarketing';
         break;
      case 'maintenance':
         index = 'maintenance';
         break;
      default:
         return ctx.redirect('/pricing');
   }

   plan = plans[index] || null;
   PAGE_NAME = `${plan.name} Order`;

   return await ctx.render('order', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      plan
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
 * Career page
 * @route GET /career
 */
router.get('/career', async ctx => {
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
router.get('/career/jobs', async ctx => {
   const PAGE_NAME = 'Jobs';

   return await ctx.render('jobs', { 
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
   const team = require('./values/team.json');
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

// Start listening
app.listen(PORT, () => {

   /** @local */
   if (process.env.NODE_ENV !== 'production') {
      console.log(`visit http://localhost:${PORT}`);
   }
});