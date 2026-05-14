# Baldo E-commerce Backend

Backend API for **Baldo**, an academic full-stack e-commerce project. This repository contains the Express, Sequelize, and PostgreSQL backend used by a separate React/Vite frontend application.

Author: Marco Guevara

## Project Purpose

This backend was created for academic purposes as part of a full-stack e-commerce project. It provides authentication, product catalogue access, shopping cart management, user profile updates, and simulated checkout logic for the Baldo frontend.

The project is not intended to process real payments or operate as a production commerce system without further security, validation, testing, and infrastructure work.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- JSON Web Tokens
- HTTP-only authentication cookies
- Swagger / OpenAPI documentation

## Requirements

- Node.js
- npm
- PostgreSQL database, either local PostgreSQL or Supabase

## Installation

Install dependencies:

```bash
npm install
```

## Environment Configuration

Environment example files are included:

```txt
.env.example
.env.local.example
.env.production.example
```

For local development, create a local environment file:

```bash
copy .env.local.example .env.local
```

Then update the database and authentication values:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_local_database_name
DATABASE_USER=postgres
DATABASE_PASSWORD=your_local_database_password
DATABASE_SCHEMA=public
DATABASE_SSL=false

JWT_SECRET=replace_with_a_secure_local_secret
JWT_EXPIRES_IN=1h
AUTH_COOKIE_NAME=token
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
COOKIE_MAX_AGE=3600000

NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

Real environment files are ignored by Git and should not be committed.

## Database Setup

Synchronize the database schema locally:

```bash
npm run db:sync:local
```

Seed the local database:

```bash
npm run db:seed:local
```

Remove seeded data:

```bash
npm run db:unseed:local
```

The seed script creates demo users and product catalogue data for development and frontend integration.

## Running the Server

Start the local development server with file watching:

```bash
npm run dev:local
```

Start the local server without file watching:

```bash
npm run start:local
```

Default local URL:

```txt
http://localhost:3000
```

## API Documentation

Swagger UI is available at:

```txt
http://localhost:3000/api-docs
```

The raw OpenAPI JSON specification is available at:

```txt
http://localhost:3000/api-docs.json
```

Protected endpoints can be tested in Swagger by logging in, copying the returned token, and using the Bearer authentication option.

## Authentication

The API supports JWT authentication through:

- `Authorization: Bearer <token>`
- HTTP-only cookie named by `AUTH_COOKIE_NAME`

The Swagger documentation presents Bearer authentication for simpler testing.

## Endpoint Overview

### Health

```txt
GET /health
```

### Auth

```txt
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

### Products

```txt
GET /products
GET /products/:productId
```

### Cart

```txt
GET /cart
POST /cart/items
PATCH /cart/items/:cartItemId
DELETE /cart/items/:cartItemId
```

### Checkout

```txt
POST /checkout
```

### Users

```txt
GET /users/me
PATCH /users/me
```

## Frontend Integration

This backend is designed to support a separate React/Vite frontend. The expected local frontend origin is:

```txt
http://localhost:5173
```

If the frontend runs on another origin, update `CORS_ORIGIN` in the environment file.

Typical frontend authentication flow:

1. Register or log in through `/auth/register` or `/auth/login`.
2. Store or use the returned JWT token.
3. Send protected requests with `Authorization: Bearer <token>`.
4. Use `/auth/me` to restore the current user session.
5. Use cart and checkout endpoints after authentication.

## Available Scripts

```txt
npm run start
npm run start:local
npm run start:prod
npm run dev:local
npm run db:sync:local
npm run db:sync:prod
npm run db:seed:local
npm run db:seed:prod
npm run db:unseed:local
npm run db:unseed:prod
```

## Project Structure

```txt
src/
  app.js
  server.js
  config/
  controllers/
  middlewares/
  models/
  routes/
  seeders/
```

## License

This project uses the ISC license as declared in `package.json`.
