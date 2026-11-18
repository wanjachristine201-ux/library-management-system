# Library Management System

A backend application for managing library resources using NestJS, Prisma ORM, and PostgreSQL.

## Technologies Used

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Project Structure

```text
library-management-system/
├── README.md
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── prisma/
    │   │   ├── prisma.module.ts
    │   │   └── prisma.service.ts
    │   └── app.module.ts
    ├── .env.example
    └── prisma.config.ts
```

## Setup Instructions

1. Clone the repository.
2. Navigate into the API directory:

```bash
cd api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file using `.env.example` as a reference.

5. Configure your PostgreSQL connection string in `.env`.

6. Apply database migrations:

```bash
npx prisma migrate dev
```

7. Generate Prisma Client:

```bash
npx prisma generate
```

8. Seed the database:

```bash
npx tsx prisma/seed.ts
```

9. Start the development server:

```bash
npm run start:dev
```

## Database Models

The application currently contains three main models:

- **User:** Stores library user information and roles.
- **Genre:** Stores book categories.
- **Book:** Stores book information and references its genre.

## Schema Decisions

The Book model references the Genre model through a foreign key called `genreId` rather than embedding genre information directly inside each book.

This relational approach avoids unnecessary duplication of genre information and improves data consistency. Each genre can be associated with multiple books, while each book references one genre.

Using a separate Genre model also makes it easier to manage, update, and query book categories independently.

## Database Seeding

The seed script populates the database with:

- 4 genres.
- 16 books distributed across the genres.

The script uses upsert operations to avoid creating duplicate records when executed repeatedly.

## Environment Variables

The application requires a `DATABASE_URL` environment variable containing the PostgreSQL connection string.

Actual database credentials must remain in the local `.env` file and must never be committed to version control.