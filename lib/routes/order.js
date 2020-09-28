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
router.get('/success', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const PAGE_NAME = 'Thanks for placing order';
    yield ctx.render('order/success', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url
    });
}));
router.get('/:planId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId } = ctx.params;
    const plans = require(path_1.default.resolve(DATA_ROUTE_DIR, 'plans.json'));
    let PAGE_NAME;
    let index;
    let plan;
    switch ((planId || '').toLowerCase()) {
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
    yield ctx.render('order/index', {
        PAGE_NAME,
        PAGE_ROUTE: ctx.url,
        plan
    });
}));
exports.default = router;
