"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path_1 = __importDefault(require("path"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_ejs_1 = __importDefault(require("koa-ejs"));
const routes_1 = __importDefault(require("./routes"));
const app = new koa_1.default();
const PROJECT_ROOT_DIR = path_1.default.join(__dirname, '..');
app
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
app.use(koa_static_1.default(path_1.default.resolve(PROJECT_ROOT_DIR, 'static')));
koa_ejs_1.default(app, {
    root: path_1.default.resolve(PROJECT_ROOT_DIR, 'views'),
    viewExt: 'ejs',
    layout: 'layout',
    cache: false,
    debug: false
});
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Visit http://localhost:${PORT}`);
    });
}
exports.default = app;
