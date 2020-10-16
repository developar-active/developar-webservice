"use strict"
const onProduction = process.env.NODE_ENV == 'production';

/**
 * Load env variables for local development
 * @local
 */
if (!onProduction) {
   require('dotenv').config();
}

// Imports
const Koa = require('koa');
const serve = require('koa-static');
const render = require('koa-ejs');
const path = require('path');

const subdomain = new (require('koa-subdomain'));

 // Koa router
const router = require('./routes');

// Initiate
const app = new Koa(); // Koa instance

const PORT = process.env.PORT || 4000; // Server PORT
let cacheTemplate = false;

// Set values according to platform
if (onProduction) {
   cacheTemplate = true;
}

// Reserve subdomains
/** @host careers.developar.in */
subdomain.use('careers', require('./routes/career').routes());

/** @host about.developar.in */
subdomain.use('about', require('./routes/about').routes());

// Use subdomain
app.use(subdomain.routes());

// Base router
app
   .use(router.routes())
   .use(router.allowedMethods()); // Router

// Config static assets
app.use(serve(path.join(__dirname, 'static')));

// Render template
render(app, {  // EJS Template rendering
   root: path.join(__dirname, 'views'),
   viewExt: 'ejs',
   layout: 'layout',
   cache: cacheTemplate,
   debug: false
})

// Handle unknown route
app.use(async ctx => {
   ctx.status = 404;

   return ctx.render('codes/404', {
      PAGE_NAME: 'Page not found',
      PAGE_ROUTE: ctx.url
   });
});



// Start listening
app.listen(PORT, function () {

   /** @local */
   if (!onProduction) {
      console.log(`Server running at ${'\x1b[36m'}http://localhost:${PORT}${'\x1b[0m'}`);
   }
});