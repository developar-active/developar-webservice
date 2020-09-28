/**
 * Load env variables for local development
 * @local
 */
if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import render from 'koa-ejs'
import router from './routes';

// Initiate
const app = new Koa()

const PROJECT_ROOT_DIR = path.join(__dirname, '..')

// Setup
app
	.use(router.routes())
	.use(router.allowedMethods()) // Router

app.use(serve(path.resolve(PROJECT_ROOT_DIR, 'static'))) // Config static assets

// EJS Template rendering
render(app, {
	root: path.resolve(PROJECT_ROOT_DIR, 'views'),
	viewExt: 'ejs',
	layout: 'layout',
	cache: false,
	debug: false
})

/** 
 * Start listening on local development
 * @local
 */
if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 5000 // Server PORT

	app.listen(PORT, () => {
		console.log(`Visit http://localhost:${PORT}`)
	})
}

export default app