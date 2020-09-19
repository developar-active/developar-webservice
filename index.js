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

// Initiate
const app = new Koa(); // Koa instance
const router = new KoaRouter(); // Koa router instance
const PORT = process.env.PORT || 4000; // Server PORT

// Setups
app
   .use(router.routes())
   .use(router.allowedMethods()) // Router

app.use(serve(path.join(__dirname, 'public'))); // Config static assets

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

   return await ctx.render('pricing', {
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url
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
      case 'digmarketing':
         index = 'digmarketing';
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