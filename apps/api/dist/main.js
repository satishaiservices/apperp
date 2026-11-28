"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        instrument: app_module_1.ObserveInstrument,
    });
    const rawCorsOrigins = process.env.CORS_ALLOWED_ORIGINS;
    const defaultAllowedOrigins = [
        'https://apperp.yecindia.com',
        'http://apperp.yecindia.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3001',
    ];
    const allowedOrigins = rawCorsOrigins
        ? rawCorsOrigins.split(',').map((o) => o.trim()).filter(Boolean)
        : defaultAllowedOrigins;
    app.enableCors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) {
                return callback(null, true);
            }
            if (allowedOrigins.includes(requestOrigin) ||
                requestOrigin === 'https://apperp.yecindia.com' ||
                requestOrigin.endsWith('.yecindia.com') ||
                requestOrigin.endsWith('.trycloudflare.com') ||
                (process.env.NODE_ENV !== 'production' &&
                    (requestOrigin.startsWith('http://localhost:') ||
                        requestOrigin.startsWith('http://127.0.0.1:') ||
                        requestOrigin.startsWith('http://10.0.2.2:') ||
                        requestOrigin.startsWith('http://192.168.')))) {
                return callback(null, true);
            }
            return callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
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