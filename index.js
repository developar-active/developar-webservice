"use strict"
/**
 * Load env variables for local development
 * @local
 */
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

// Load
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const router = require('./routes'); // Koa router
const api = require('./api');
const mongoose = require('mongoose');

// Initiate
const app = new Koa(); // Koa instance

const PORT = process.env.PORT || 4000; // Server PORT

// DB Connection
mongoose.connect(
   process.env.MONGO_URL, 
   {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   (err) => {
      if (err) {
         throw(err);
      }
   }
);

app.use(bodyParser());

// Setups
app
.use(router.routes())
.use(router.allowedMethods()); // Router

router.use('/api', api.routes(), api.allowedMethods()); // Use API routes

app.use(serve(path.join(__dirname, 'static'))); // Config static assets


// *** Resolve static javascripts ***
/** @route GET /app.js */
router.get('/app.js', async ctx => {
   let content;
   try {
      content = fs.readFileSync(path.join(__dirname, 'static/app.js'), 'utf8');
   } catch (err) {
      ctx.status = 404;
      return ctx.body = "Can't get /app.js";
   }

   ctx.res.setHeader('Content-Type', 'application/javascript');

   return ctx.body = content;
});

render(app, {  // EJS Template rendering
   root: path.join(__dirname, 'views'),
   viewExt: 'ejs',
   layout: 'layout',
   cache: false,
   debug: false
})

// Start listening
app.listen(PORT, () => {

   /** @local */
   if (process.env.NODE_ENV !== 'production') {
      console.log(`visit http://localhost:${PORT}`);
   }
});