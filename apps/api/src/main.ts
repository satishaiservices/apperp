import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule, ObserveInstrument } from './app.module';

const DEFAULT_PRODUCTION_ORIGINS = ['https://apperp.yecindia.com'];
const DEV_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1|10\.0\.2\.2|192\.168\.\d+\.\d+)(:\d+)?$/;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });

  const isProduction = process.env.NODE_ENV === 'production';

  // LiteSpeed/Passenger proxies every request: trust exactly one proxy hop so that
  // req.ip (used by the rate limiter) is the visitor's address, not the proxy's.
  app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));

  app.use(
    helmet({
      // API returns JSON and images only; the web app sets its own CSP.
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
      crossOriginResourcePolicy: { policy: 'same-site' },
    }),
  );
  app.use(cookieParser());

  // CORS: only explicitly configured origins (comma-separated CORS_ALLOWED_ORIGINS).
  // Development additionally allows localhost / LAN addresses.
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
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // No Origin header: mobile apps, curl, server-to-server (not subject to CORS).
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

  // Route rewrite middleware: seamlessly handle /api/v1, /api, or duplicate /api prefixes from cPanel Passenger reverse proxies
  app.use((req: any, _res: any, next: any) => {
    // Normalize URL if reverse proxy prepended duplicate /api
    while (req.url.startsWith('/api/api/')) {
      req.url = req.url.substring(4);
    }

    if (req.url.startsWith('/api/v1/')) {
      req.url = req.url.substring('/api/v1'.length);
    } else if (req.url === '/api/v1') {
      req.url = '/';
    } else if (req.url.startsWith('/api/')) {
      req.url = req.url.substring('/api'.length);
    } else if (req.url === '/api') {
      req.url = '/';
    }
    next();
  });

  // Enforce DTO validation and strip unauthorized properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Enable graceful shutdown and lifecycle hooks.
  app.enableShutdownHooks();

  const rawPort = process.env.PORT || 3001;
  const isPipeOrSocket = typeof rawPort === 'string' && isNaN(Number(rawPort));

  if (isPipeOrSocket) {
    await app.listen(rawPort);
  } else {
    await app.listen(Number(rawPort), '0.0.0.0');
  }
}

void bootstrap();
