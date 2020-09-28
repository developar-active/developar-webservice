import KoaRouter from 'koa-router'
import path from 'path'
const router = new KoaRouter()

const DATA_ROUTE_DIR = path.join(__dirname, '..', '..', 'data')

/**
 * Order success page
 * @route GET /order/success
 */
router.get('/success', async ctx => {
	const PAGE_NAME = 'Thanks for placing order'

	await ctx.render('order/success', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Order Page
 * @route GET /order/:planId
 */
router.get('/:planId', async ctx => {
   const { planId } = ctx.params
   const plans = require(path.resolve(DATA_ROUTE_DIR, 'plans.json'))
   let PAGE_NAME: string
   let index: string
	let plan: ServicePlanInstance

   switch((planId || '').toLowerCase()) {
      case 'static-website':
         index = 'static'
         break
      case 'dynamic-website':
         index = 'dynamic'
         break
      case 'ecommerce':
         index = 'eCommerce'
         break
      case 'mobile-app':
         index = 'mobileApp'
         break
      case 'digital-marketing':
         index = 'digitalMarketing'
         break
      case 'maintenance':
         index = 'maintenance'
         break
      default:
         return ctx.redirect('/pricing')
   }

   plan = plans[index] || null
   PAGE_NAME = `${plan.name} Order`

	await ctx.render('order/index', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      plan
   })
})

export default router