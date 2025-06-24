# Backend Project Structure

This directory contains the backend codebase for the NeighborHub application, which provides API endpoints for a Flutter frontend. The structure is designed for scalability, maintainability, and clarity.

## Tech Stack
- **Node.js** with **Express** for the server and API
- **PostgreSQL** as the database
- **Prisma** as the ORM
- **JWT** and **bcrypt** for authentication and password hashing

## Folder Structure

- `src/` - Main source code for the backend
  - `controllers/` - Route handlers and controllers for API endpoints
  - `models/` - Data models and schemas
  - `routes/` - API route definitions
  - `services/` - Business logic and service layer
  - `middlewares/` - Custom middleware functions
  - `utils/` - Utility functions and helpers
  - `config/` - Configuration files (env, database, etc.)
  - `jobs/` - Background jobs, schedulers, or workers (optional)
  - `repositories/` - Data access layer (optional, for complex apps)
- `prisma/` - Prisma schema and migration files
  - `schema.prisma` - Main Prisma schema file
- `.env` - Environment variables (not committed)
- `package.json` - Node.js dependencies and scripts
- `tests/` - Automated tests (unit, integration, etc.)
- `scripts/` - Utility scripts for setup, migration, etc.
- `public/` - Static files (if needed)

> Next, you can start building your Express app in `src/`, define your Prisma models in `prisma/schema.prisma`, and configure your database in `.env`. 