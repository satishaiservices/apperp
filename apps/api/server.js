// apps/api/server.js - cPanel Phusion Passenger entrypoint for NestJS API
const path = require('path');
const fs = require('fs');

// Attempt to load .env from current directory or parent directory
const envPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(__dirname, '../../.env');

try {
  const dotenv = require('dotenv');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else if (fs.existsSync(rootEnvPath)) {
    dotenv.config({ path: rootEnvPath });
  } else {
    dotenv.config();
  }
} catch {
  // dotenv is already bundled in NestJS runtime if needed
}

// Require and start the compiled NestJS application
require('./dist/main.js');
