# Project Rules

## Database & Seeding Constraint
*   **CRITICAL:** NEVER run the database seed command (`npm run db:seed`, `npx prisma db seed`, `npx prisma db push`, or `--force-reset` commands) without asking the user for explicit confirmation first. The client uploads live data through the admin panel, and running seed commands will overwrite their live updates.
