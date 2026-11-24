# CivilERP / Site Reports — Backend API Documentation

## 1. Overview

The **CivilERP Backend API** is an enterprise multi-tenant RESTful service built with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. It provides role-based access control (RBAC), multi-tenant isolation, real-time field data synchronization, GPS attendance verification, and site progress audits.

- **Framework**: NestJS (Node.js 22 LTS)
- **Version**: `1.0.0`
- **Database**: PostgreSQL 17
- **ORM**: Prisma Client
- **Default Port**: `3001`
- **Routing**: Root mounted (e.g. `/auth/login`, `/projects`, `/attendance/check-in`)
- **Authentication**: JWT Bearer Tokens (`Authorization: Bearer <accessToken>`)

---

## 2. Architecture & Modules

The API application source code is structured under `apps/api/src/`:

```
apps/api/src/
├── activities/             # Master Civil Engineering activity catalog
├── attendance/             # Shift attendance tracking with GPS coordinates
├── auth/                   # JWT authentication, guards, 2-step OTP password reset
├── database/               # Prisma database client & health monitoring
├── dprs/                   # Daily Progress Reports compilation & approval
├── projects/               # Civil construction projects & site assignments
├── rbac/                   # Role-Based Access Control guards & decorators
├── roles/                  # Role & permission management
├── site-submissions/      # Field submissions with chainage & stamped photos
├── users/                  # User accounts, supervisor profiles & avatar updates
├── app.module.ts           # Root application module
└── main.ts                 # Bootstrap script & Swagger OpenAPI setup
```

---

## 3. Authentication & Security

### 3.1 Authentication Strategy
- Endpoints (except public auth endpoints) require a valid JWT token in the `Authorization` header:
  ```http
  Authorization: Bearer <JWT_ACCESS_TOKEN>
  ```
- Unauthenticated requests receive `401 Unauthorized`.
- Forbidden requests (insufficient RBAC permissions) receive `403 Forbidden`.

### 3.2 Tenant Context
- Multi-tenancy is enforced at the database and query level via `tenantId` extracted from the authenticated user's active `TenantMembership`.
- Data is strictly isolated between tenants (e.g. `YEC India`).

---

## 4. API Endpoint Reference

### 4.1 Authentication (`/auth`)

#### `POST /auth/login`
Authenticates a supervisor or office administrator.

- **Request Body**:
  ```json
  {
    "email": "supervisor@yecindia.com",
    "password": "Password123!"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "e4f8d9b2-3c1a-4d5e-8f2a-1b3c4d5e6f7a",
      "fullName": "Marcus Aurelius",
      "email": "supervisor@yecindia.com",
      "phone": "+91 98765 43210",
      "emergencyPhone": "+91 91234 56789",
      "avatarUrl": "https://cdn.yecindia.com/avatars/marcus.jpg",
      "role": "SUPERVISOR",
      "tenantId": "c8d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f",
      "tenantName": "YEC India"
    }
  }
  ```

#### `POST /auth/forgot-password`
Sends a secure 6-digit verification code to the registered user.

- **Request Body**:
  ```json
  {
    "email": "mani.bhaba@yecindia.com"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "OTP sent to registered mobile number and email",
    "expiresInSeconds": 600
  }
  ```

#### `POST /auth/reset-password`
Verifies OTP code and updates the account password.

- **Request Body**:
  ```json
  {
    "email": "mani.bhaba@yecindia.com",
    "token": "849201",
    "newPassword": "NewSecurePassword456!"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Password reset successfully. You can now log in."
  }
  ```

---

### 4.2 User Profile (`/users`)

#### `GET /users/me`
Retrieves the profile of the currently authenticated user.

- **Response** (`200 OK`):
  ```json
  {
    "id": "d3d12c3d-dada-4966-870f-3147bc952a3a",
    "fullName": "Mani Bhaba",
    "email": "mani.bhaba@yecindia.com",
    "phone": "+91 98450 12345",
    "emergencyPhone": "+91 98450 67890",
    "avatarUrl": null,
    "role": "SUPERVISOR",
    "company": "YEC India"
  }
  ```

#### `PATCH /users/me`
Updates editable profile fields.

- **Request Body**:
  ```json
  {
    "fullName": "Mani Bhaba",
    "phone": "+91 98450 12345",
    "emergencyPhone": "+91 98450 67890",
    "avatarUrl": "data:image/jpeg;base64,..."
  }
  ```
- **Response** (`200 OK`): Updated user profile object.

---

### 4.3 Attendance & GPS Shifts (`/attendance`)

#### `POST /attendance/check-in`
Records an employee's shift start time and GPS coordinates.

- **Request Body**:
  ```json
  {
    "projectId": "47822ed4-1dcf-429f-90cb-0997e234a5f8",
    "latitude": 22.3072,
    "longitude": 73.1812,
    "accuracyM": 4.5,
    "remarks": "Morning shift start at Pier 14"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "message": "Check-in recorded successfully",
    "session": {
      "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "checkInAt": "2026-11-14T02:30:00.000Z",
      "checkOutAt": null,
      "latitude": "22.3072",
      "longitude": "73.1812",
      "status": "OPEN"
    }
  }
  ```

#### `POST /attendance/check-out`
Closes the active shift session with ending GPS coordinates.

- **Request Body**:
  ```json
  {
    "sessionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "latitude": 22.3072,
    "longitude": 73.1812,
    "remarks": "Completed shift work"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "message": "Punch-out recorded successfully",
    "durationMinutes": 540,
    "session": {
      "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "status": "CLOSED"
    }
  }
  ```

#### `GET /attendance/current`
Checks if the employee has an open shift session. Returns `null` or active session.

---

### 4.4 Projects & Activities (`/projects`)

#### `GET /projects`
Returns projects accessible to the authenticated employee.

- **Response** (`200 OK`):
  ```json
  [
    {
      "id": "47822ed4-1dcf-429f-90cb-0997e234a5f8",
      "projectCode": "PRJ-EXP-07",
      "name": "Delhi-Mumbai Expressway (Ch. 120-160)",
      "clientName": "National Highways Authority of India (NHAI)",
      "status": "ACTIVE"
    }
  ]
  ```

#### `GET /projects/:projectId/activities`
Returns scheduled billable construction activities for the selected project.

- **Response** (`200 OK`):
  ```json
  [
    {
      "id": "3858b460-3f3a-42bd-a55c-1aa87328e27a",
      "activityCode": "ACT-EMB-01",
      "name": "Embankment Construction & Compaction"
    }
  ]
  ```

---

### 4.5 Site Submissions (`/projects/:projectId/submissions`, `/submissions`)

#### `POST /projects/:projectId/submissions`
Submits a daily field progress report with chainage extents and stamped photos.

- **Request Body**:
  ```json
  {
    "startChainage": "1450",
    "endChainage": "1800",
    "activityIds": ["3858b460-3f3a-42bd-a55c-1aa87328e27a"],
    "latitude": 22.3072,
    "longitude": 73.1812,
    "locationAccuracyM": 5.0,
    "remarks": "Subgrade compaction completed between chainage 1450 and 1800."
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "id": "d03e45cc-33d9-40d9-8a43-6c3ed6d20d30",
    "startChainage": "1450",
    "endChainage": "1800",
    "createdAt": "2026-11-14T07:12:38.218Z"
  }
  ```

#### `GET /submissions`
Retrieves past site submissions with filtering and pagination.
- Query parameters:
  - `limit`: default `50`
  - `offset`: default `0`
  - `projectId`: optional UUID
  - `search`: optional search term

---

## 5. Error Handling & Standard Responses

All error responses return a standardized JSON structure:

```json
{
  "statusCode": 400,
  "message": [
    "startChainage must be a valid chainage identifier",
    "at least one activity must be selected"
  ],
  "error": "Bad Request",
  "timestamp": "2026-11-14T11:45:00.000Z"
}
```

Common HTTP status codes:
| Code | Reason | Description |
|---|---|---|
| `200` | OK | Request succeeded. |
| `201` | Created | Resource successfully created. |
| `400` | Bad Request | Validation error or malformed payload. |
| `401` | Unauthorized | Missing or expired JWT token. |
| `403` | Forbidden | Insufficient permissions for tenant or action. |
| `404` | Not Found | Target resource does not exist. |
| `500` | Server Error | Unhandled server error (logged to audit log). |

---

## 6. Running & Developing the API

### Local Development
```bash
cd apps/api

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Start in watch mode
npm run start:dev
```

### Docker Deployment
```bash
# Start API and PostgreSQL in Docker
docker compose --env-file .env -f infrastructure/docker/docker-compose.yml up -d vyhir-api vyhir-db

# Check health
curl http://localhost:3001/api/v1/health
```
