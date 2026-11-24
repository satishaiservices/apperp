import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Configure CORS securely with origin whitelist
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
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow requests with no origin (such as mobile apps, curl, server-to-server)
      if (!requestOrigin) {
        return callback(null, true);
      }
      if (
        allowedOrigins.includes(requestOrigin) ||
        requestOrigin === 'https://apperp.yecindia.com' ||
        requestOrigin.endsWith('.yecindia.com') ||
        requestOrigin.endsWith('.trycloudflare.com') ||
        (process.env.NODE_ENV !== 'production' &&
          (requestOrigin.startsWith('http://localhost:') ||
            requestOrigin.startsWith('http://127.0.0.1:') ||
            requestOrigin.startsWith('http://10.0.2.2:') ||
            requestOrigin.startsWith('http://192.168.')))
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
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
