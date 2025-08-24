# Todo API (Express + Prisma + MySQL)
An Express.js API backed by Prisma and MySQL that provides CRUD endpoints for tasks. Input is validated with Zod (kept in sync with the Prisma enum). CORS is configurable via environment variables. Deletes are idempotent.
Tech
- Node.js + Express
- Prisma ORM
- MySQL 8 (Docker recommended locally)
- Zod (request validation)
- CORS (configured via env)

# Endpoints
GET    /tasks            → List tasks (newest first)
GET    /tasks/:id        → Fetch a single task
POST   /tasks            → Create  { title, color, completed? }
PUT    /tasks/:id        → Update  { title?, color?, completed? }
DELETE /tasks/:id        → Delete

# Example payloads

// Create
{
  "title": "Buy groceries",
  "color": "yellow",
  "completed": false
}

// Update

{
  "title": "Buy groceries and snacks",
  "color": "yellow",
  "completed": true
}

# Environment Variables
create a .env at the root of the backend repo and replace rootpassword with your docker root password.
# .env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/todo_db"
PORT=4000
CORS_ORIGIN=http://localhost:3000

# Quick Start
1. Start MySQL(Docker)
docker compose up -d
ensure MySQL is listening on 3306 and DATABASE_URL matches
Minimal compose ex:
version: "3.8"
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: todo_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
volumes:
  mysql_data:

2. Install Dependencies
npm install

3. Initialize the database
# Apply schema (writes a migration and updates DB), then generate Prisma client
npx prisma migrate dev --name init

# Alternatively during rapid iteration:
npx prisma db push && npx prisma generate

# Optional: inspect data
npx prisma studio

 4. Run the API
 npm run dev
