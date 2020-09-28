import KoaRouter from 'koa-router'
import path from 'path'
import CareerRouter from './career'
import OrderRouter from './order'
const router = new KoaRouter()

const DATA_ROUTE_DIR = path.join(__dirname, '..', '..', 'data')

// Use career routes
router.use(
	'/career', 
	CareerRouter.routes(), 
	CareerRouter.allowedMethods()
)

// Use order router
router.use(
	'/order',
	OrderRouter.routes(),
	OrderRouter.allowedMethods()
)

/**
 * Home page
 * @route GET /
 */
router.get('/', async ctx => {
	const PAGE_NAME = 'Home'

	await ctx.render('index', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Services page 
 * @route GET /services
 */
router.get('/services', async ctx => {
	const PAGE_NAME = 'Services'

	await ctx.render('services', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Pricing page 
 * @route GET /pricing
 */
router.get('/pricing', async ctx => {
	const PAGE_NAME = 'Pricing'
	let plans: unknown = require(path.resolve(DATA_ROUTE_DIR, 'plans.json'))

	if (typeof plans === 'object' && !Array.isArray(plans)) {
		plans = Object.values(plans)
	}

	await ctx.render('pricing', {
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
	const PAGE_NAME = 'Contact'

	await ctx.render('contact', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * About page
 * @route GET /about
 */
router.get('/about', async ctx => {
	const PAGE_NAME = 'About - Our Background, Our Mission'

	await ctx.render('about', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Team page
 * @route GET /team/[role?]
 */
router.get('/team/:role?', async ctx => {
	const { role } = ctx.params
	const team = require(path.resolve(DATA_ROUTE_DIR, 'team.json'))
	let PAGE_NAME: string
	let index: string
	let collection: TeamInstance

	switch (role) {
		case 'pioneers':
		default:
			index = 'pioneers'
			break
		case 'developers':
			index = 'developers'
			break
		case 'dm':
			index = 'designMarketing'
			break
	}

	collection = team[index]

	PAGE_NAME = `${collection.name} Team`

	await ctx.render('team', {
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
	const PAGE_NAME = 'Privacy'

	await ctx.render('privacy', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Terms page
 * @route GET /terms
 */
router.get('/terms', async ctx => {
	const PAGE_NAME = 'Terms'

	await ctx.render('terms', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

export default router