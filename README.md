
# HackathonOrganiser

A comprehensive platform for managing hackathons with different user roles, team formation, project submissions, and real-time voting.

## Project Overview

HackathonOrganiser is a full-stack web application that provides a complete solution for hackathon management. The platform supports three user roles: Admin, Organiser, and Participant, each with specific permissions and capabilities.

### Key Features

- **Authentication & Authorization**: Role-based access control with JWT authentication
- **Multi-Role Support**: Admin, Organiser, and Participant dashboards
- **Team Management**: Create teams, join with unique codes
- **Project Submissions**: Submit projects with details and links
- **Voting System**: Vote on projects with real-time leaderboard updates
- **Administrative Tools**: Manage users, hackathons, and approvals

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Shadcn UI components

### Backend (Setup Instructions Below)
- Node.js + Express
- Prisma ORM
- PostgreSQL database
- JWT for authentication
- Socket.IO for real-time updates

## Demo Accounts

For testing purposes, you can use the following demo accounts:

- **Admin**: admin@example.com / password
- **Organiser**: organiser@example.com / password
- **Participant**: participant@example.com / password

## Setting Up the Backend

This project uses a mock API for demonstration. To connect to a real backend:

1. Create a new Node.js project with Express:

```bash
mkdir hackathon-backend
cd hackathon-backend
npm init -y
npm install express cors jsonwebtoken bcrypt prisma socket.io dotenv
npm install -D typescript ts-node @types/express @types/node
```

2. Initialize Prisma with PostgreSQL:

```bash
npx prisma init
```

3. Set up your database schema in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String       @id @default(uuid())
  name         String
  email        String       @unique
  password     String
  role         String       // "ADMIN", "ORGANISER", "PARTICIPANT"
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  hackathons   Hackathon[]
  teamLeader   Team[]       @relation("TeamLeader")
  teamMember   TeamMember[]
  votes        Vote[]
}

model Hackathon {
  id          String   @id @default(uuid())
  name        String
  description String
  date        DateTime
  location    String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  organiser   User     @relation(fields: [organiserId], references: [id])
  organiserId String
  teams       Team[]
}

model Team {
  id          String       @id @default(uuid())
  name        String
  joinCode    String       @unique
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  hackathon   Hackathon    @relation(fields: [hackathonId], references: [id])
  hackathonId String
  leader      User         @relation("TeamLeader", fields: [leaderId], references: [id])
  leaderId    String
  members     TeamMember[]
  project     Project?
}

model TeamMember {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  team      Team     @relation(fields: [teamId], references: [id])
  teamId    String
}

model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  repoLink    String
  demoLink    String
  approved    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  team        Team     @relation(fields: [teamId], references: [id])
  teamId      String   @unique
  votes       Vote[]
}

model Vote {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  voter     User     @relation(fields: [voterId], references: [id])
  voterId   String
  project   Project  @relation(fields: [projectId], references: [id])
  projectId String

  @@unique([voterId, projectId])
}
```

4. Create a `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/hackathon_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

5. Implement API endpoints for authentication, hackathons, teams, projects, etc.

6. Setup Socket.IO for real-time leaderboard updates

7. Update the frontend API service to connect to your backend endpoints instead of using mock data

## Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Deployment

### Frontend
- Deploy to Vercel or Netlify

### Backend
- Deploy to Railway, Fly.io, or Heroku
- Set up PostgreSQL database on Supabase or NeonDB

## License

MIT
