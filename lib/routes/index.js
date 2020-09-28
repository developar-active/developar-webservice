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
const career_1 = __importDefault(require("./career"));
const order_1 = __importDefault(require("./order"));
const router = new koa_router_1.default();
const DATA_ROUTE_DIR = path_1.default.join(__dirname, '..', '..', 'data');
router.use('/career', career_1.default.routes(), career_1.default.allowedMethods());
router.use('/order', order_1.default.routes(), order_1.default.allowedMethods());
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Home';
    yield ctx.render('index', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/services', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Services';
    yield ctx.render('services', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/pricing', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Pricing';
    let plans = require(path_1.default.resolve(DATA_ROUTE_DIR, 'plans.json'));
    if (typeof plans === 'object' && !Array.isArray(plans)) {
        plans = Object.values(plans);
    }
    yield ctx.render('pricing', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url,
        plans
    });
}));
router.get('/contact', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Contact';
    yield ctx.render('contact', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/about', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'About - Our Background, Our Mission';
    yield ctx.render('about', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/team/:role?', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = ctx.params;
    const team = require(path_1.default.resolve(DATA_ROUTE_DIR, 'team.json'));
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
    yield ctx.render('team', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url,
        collection
    });
}));
router.get('/privacy', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Privacy';
    yield ctx.render('privacy', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/terms', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Terms';
    yield ctx.render('terms', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
exports.default = router;
