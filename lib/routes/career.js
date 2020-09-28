"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const path_1 = __importDefault(require("path"));
const router = new koa_router_1.default();
const DATA_ROUTE_DIR = path_1.default.join(__dirname, '..', '..', 'data');
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Career';
    yield ctx.render('career', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/jobs', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Jobs';
    const jobs = require(path_1.default.resolve(DATA_ROUTE_DIR, 'jobs.json'));
    yield ctx.render('jobs/index', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url,
        jobs
    });
}));
router.get('/jobs/success', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Thanks for apply';
    yield ctx.render('jobs/success', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/jobs/:postId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = ctx.params;
    let PAGE_NAME;
    let post;
    const jobs = require(path_1.default.resolve(DATA_ROUTE_DIR, 'jobs.json'));
    post = jobs.find(job => job.id === postId) || null;
    if (!post) {
        return ctx.redirect('/career/jobs');
    }
    PAGE_NAME = `Apply for ${post.name.toLocaleLowerCase()}`;
    yield ctx.render('jobs/post', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url,
        post
    });
}));
exports.default = router;
