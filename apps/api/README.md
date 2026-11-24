# CivilERP — Backend API Service

NestJS backend REST API service providing multi-tenant role-based access control, GPS attendance tracking, daily progress report (DPR) management, and civil engineering site data synchronization.

For complete endpoint references, schemas, and authentication guides, see the comprehensive [Backend API Documentation](file:///home/embdev/workspace/embdev/IT_projects/CivilERP/docs/api.md).

## Quick Start

### 1. Prerequisites
- Node.js 22 LTS
- Docker & Docker Compose
- PostgreSQL 17

### 2. Environment Setup
Copy root `.env.example` to `.env` and verify database credentials and JWT secret.

### 3. Run with Docker
```bash
# Start database and API
docker compose --env-file .env -f infrastructure/docker/docker-compose.yml up -d vyhir-db vyhir-api

# Check service health
curl http://localhost:3001/api/v1/health
```

### 4. Run Locally
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Start development server
npm run start:dev

# Run tests
npm run test
```
