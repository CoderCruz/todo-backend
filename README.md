# Overview

An Express.js API backed by **Prisma** and **MySQL** that provides CRUD endpoints for tasks. Input is validated with **Zod** (kept in sync with the Prisma enum). CORS is configurable via environment variables. Deletes are idempotent.

## Tech

- **Node.js + Express**
- **Prisma ORM**
- **MySQL 8** (Docker recommended for local)
- **Zod** (request validation)
- **CORS** (configured via env)

## Endpoints

GET /tasks → List tasks (newest first)
GET /tasks/:id → Fetch a single task
POST /tasks → Create { title, color, completed? }
PUT /tasks/:id → Update { title?, color?, completed? }
DELETE /tasks/:id → Delete


### Example payloads

```json
// Create
{
  "title": "Buy groceries",
  "color": "yellow",
  "completed": false
}

// Update
{
  "title": "Buy groceries and snacks",
  "completed": true
}
```
Environment Variables

# .env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/todo_db"
PORT=4000
CORS_ORIGIN=http://localhost:3000

Database Initialization
# Start MySQL (Docker)
docker compose up -d

# Apply schema and generate the Prisma client
npx prisma migrate dev --name init

# (optional) Open a data viewer
npx prisma studio

Run
npm install
npm run dev   # API available at http://localhost:4000
