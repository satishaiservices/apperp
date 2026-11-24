// apps/web/server.js - cPanel Phusion Passenger entrypoint for Next.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Attempt to load .env from current directory or parent directory
try {
  const envPath = path.resolve(__dirname, '.env');
  const rootEnvPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
  } else if (fs.existsSync(rootEnvPath)) {
    require('dotenv').config({ path: rootEnvPath });
  }
} catch {
  // dotenv is optional in production
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

const rawPort = process.env.PORT || 3000;
const isPipeOrSocket = typeof rawPort === 'string' && isNaN(Number(rawPort));

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  if (isPipeOrSocket) {
    server.listen(rawPort, () => {
      console.log(`> Next.js Web server listening on Passenger socket: ${rawPort}`);
    });
  } else {
    server.listen(Number(rawPort), '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`> Next.js Web server listening on port ${rawPort}`);
    });
  }
});
