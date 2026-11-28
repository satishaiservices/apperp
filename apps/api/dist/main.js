"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const DEFAULT_PRODUCTION_ORIGINS = ['https://apperp.yecindia.com'];
const DEV_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1|10\.0\.2\.2|192\.168\.\d+\.\d+)(:\d+)?$/;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        instrument: app_module_1.ObserveInstrument,
    });
    const isProduction = process.env.NODE_ENV === 'production';
    app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
        crossOriginResourcePolicy: { policy: 'same-site' },
    }));
    app.use((0, cookie_parser_1.default)());
    const configuredOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
    const allowedOrigins = configuredOrigins.length
        ? configuredOrigins
        : isProduction
            ? DEFAULT_PRODUCTION_ORIGINS
            : [];
    app.enableCors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) {
                return callback(null, true);
            }
            if (allowedOrigins.includes(requestOrigin) || (!isProduction && DEV_ORIGIN.test(requestOrigin))) {
                return callback(null, true);
            }
            return callback(null, false);
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,X-Session-Mode',
        credentials: true,
    });
    app.use((req, _res, next) => {
        while (req.url.startsWith('/api/api/')) {
            req.url = req.url.substring(4);
        }
        if (req.url.startsWith('/api/v1/')) {
            req.url = req.url.substring('/api/v1'.length);
        }
        else if (req.url === '/api/v1') {
            req.url = '/';
        }
        else if (req.url.startsWith('/api/')) {
            req.url = req.url.substring('/api'.length);
        }
        else if (req.url === '/api') {
            req.url = '/';
        }
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.enableShutdownHooks();
    const rawPort = process.env.PORT || 3001;
    const isPipeOrSocket = typeof rawPort === 'string' && isNaN(Number(rawPort));
    if (isPipeOrSocket) {
        await app.listen(rawPort);
    }
    else {
        await app.listen(Number(rawPort), '0.0.0.0');
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map