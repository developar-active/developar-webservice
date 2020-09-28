import KoaRouter from 'koa-router'
import path from 'path'
const router = new KoaRouter()

const DATA_ROUTE_DIR = path.join(__dirname, '..', '..', 'data')

/**
 * Career page
 * @route GET /career
 */
router.get('/', async ctx => {
	const PAGE_NAME = 'Career'

	await ctx.render('career', {
		PAGE_NAME,
		PAGE_ROUTE: ctx.url
	})
})

/**
 * Jobs page
 * @route GET /career/jobs
 */
router.get('/jobs', async ctx => {
   const PAGE_NAME = 'Jobs'
	const jobs: Array<JobInstance> = require(path.resolve(DATA_ROUTE_DIR, 'jobs.json'))

   await ctx.render('jobs/index', { 
      PAGE_NAME, 
      PAGE_ROUTE: ctx.url,
      jobs
   })
})

/**
 * Job success page
 * @route GET /career/jobs/success
 */
router.get('/jobs/success', async ctx => {
   const PAGE_NAME = 'Thanks for apply'

   await ctx.render('jobs/success', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url
   })
})

/**
 * Job post detail
 * @route GET /career/jobs/:postId
 */
router.get('/jobs/:postId', async ctx => {
   const { postId }: { postId: string } = ctx.params

   let PAGE_NAME: string
   let post: JobInstance
	const jobs: Array<JobInstance> = require(path.resolve(DATA_ROUTE_DIR, 'jobs.json'))

	// Find requested job
   post = jobs.find(job => job.id === postId) || null

   if (!post) {
      return ctx.redirect('/career/jobs')
   }

   PAGE_NAME = `Apply for ${post.name.toLocaleLowerCase()}`

   await ctx.render('jobs/post', {
      PAGE_NAME,
      PAGE_ROUTE: ctx.url,
      post
   })
})

export default router