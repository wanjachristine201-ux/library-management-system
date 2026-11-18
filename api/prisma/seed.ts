import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create four genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction', description: 'Fictional literature and stories' },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science', description: 'Scientific knowledge and discoveries' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology', description: 'Technology and computing' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History', description: 'Historical events and civilizations' },
  });

  // Create sixteen books distributed across the genres
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780001', genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780002', genreId: fiction.id },
    { title: 'Jane Eyre', author: 'Charlotte Bronte', isbn: '9780003', genreId: fiction.id },
    { title: 'Animal Farm', author: 'George Orwell', isbn: '9780004', genreId: fiction.id },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780005', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780006', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780007', genreId: science.id },
    { title: 'Silent Spring', author: 'Rachel Carson', isbn: '9780008', genreId: science.id },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780009', genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', isbn: '9780010', genreId: technology.id },
    { title: 'Code Complete', author: 'Steve McConnell', isbn: '9780011', genreId: technology.id },
    { title: 'Design Patterns', author: 'Erich Gamma', isbn: '9780012', genreId: technology.id },

    { title: 'The Art of War', author: 'Sun Tzu', isbn: '9780013', genreId: history.id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780014', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780015', genreId: history.id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780016', genreId: history.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
  }

  console.log('Seeding completed successfully!');
  console.log('4 genres and 16 books processed.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });