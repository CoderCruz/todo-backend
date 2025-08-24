Tech
Node.js + Express
Prisma ORM
MySQL 8 (Docker)
Zod for request validation
CORS configured via env

Endpoints
GET    /tasks            → List tasks (newest first)
GET    /tasks/:id        → Fetch a single task
POST   /tasks            → Create { title, color, completed? }
PUT    /tasks/:id        → Update  { title?, color?, completed? }
DELETE /tasks/:id        → Delete

Example payloads
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

Environmnet Variables
please add a .env file at the root of the backend folder and add:
# .env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/todo_db"
PORT=4000
CORS_ORIGIN=http://localhost:3000

Database initialization:
# Start MySQL (if using Docker; compose file exposes 3306)
docker compose up -d

# Apply schema (writes a migration and updates DB)
npx prisma migrate dev --name init

# Inspect data
npx prisma studio

Run
npm install
npm run dev
