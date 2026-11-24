# CivilERP — Karya Setu (v1.0.0)

A multi-tenant civil construction ERP and daily site progress reporting platform for **YEC India**.

## Architecture

- Web: Next.js + TypeScript
- Mobile: Flutter + Dart (Karya Setu - Site Reports)
- Backend: NestJS + TypeScript (REST API v1.0.0)
- Database: PostgreSQL 17
- ORM: Prisma Client
- Infrastructure: Docker + Docker Compose
- CI/CD: GitHub Actions

## Repository Structure

- apps/api: Backend API v1.0.0 ([API Documentation](docs/api.md))
- apps/web: Web administration portal
- apps/mobile: Flutter application — Karya Setu - Site Reports v1.0.0 ([Mobile App Documentation](docs/mobile_app.md))
- packages/shared: Shared TypeScript packages
- infrastructure/docker: Docker configuration
- infrastructure/database: Database migrations and seeds
- docs: Technical documentation
  - [Mobile App Guide (v1.0.0)](docs/mobile_app.md)
  - [Backend API Guide (v1.0.0)](docs/api.md)

## Prerequisites

- Ubuntu Linux
- Git
- Node.js 22
- npm
- Docker Engine
- Docker Compose

## Local Development

1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Configure local environment variables.
4. Start Docker services:

   docker compose --env-file .env \
     -f infrastructure/docker/docker-compose.yml \
     up --build -d

## Application URLs

- Web: http://localhost:3000
- API: http://localhost:3001
- PostgreSQL: localhost:5432

## Useful Docker Commands

Start:

    docker compose --env-file .env -f infrastructure/docker/docker-compose.yml up -d

Stop:

    docker compose -f infrastructure/docker/docker-compose.yml down

View logs:

    docker compose -f infrastructure/docker/docker-compose.yml logs -f

Stop and remove containers:

    docker compose -f infrastructure/docker/docker-compose.yml down

Database volume is retained when containers are removed.

## Development Principles

- Modular monolith backend.
- Tenant isolation at every data access boundary.
- PostgreSQL as the authoritative data store.
- Versioned REST API.
- Reviewed database migrations.
- Automated CI testing.
- Never commit credentials or secrets.

## Project Status

Phase 1: Repository foundation and infrastructure.
