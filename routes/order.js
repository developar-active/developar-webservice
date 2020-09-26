const KoaRouter = require('koa-router');

const router = new KoaRouter();

/**
 * Order success page
 * @route GET /order/success
 */
router.get('/success', async ctx => {
	const PAGE_NAME = 'Thanks for placing order';

	return await ctx.render('order/success', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	});
})

/**
 * Order Page
 * @route GET /order/:planId
 */
router.get('/:planId', async ctx => {
   const { planId } = ctx.params;
   const plans = require('../values/plans.json');
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

   return await ctx.render('order/index', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      plan
   })
})

module.exports = router;