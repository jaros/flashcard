import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

config({ path: '.env.development.local' });

const defaultFlashcards = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
  },
  {
    question: 'What is 2 + 2?',
    answer: '4',
  },
  {
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter',
  },
  {
    question: 'Who wrote Romeo and Juliet?',
    answer: 'William Shakespeare',
  },
  {
    question: 'What is the chemical symbol for Gold?',
    answer: 'Au',
  },
  {
    question: 'What year did the Titanic sink?',
    answer: '1912',
  },
  {
    question: 'What is the smallest unit of life?',
    answer: 'Cell',
  },
  {
    question: 'What is the capital of Japan?',
    answer: 'Tokyo',
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    await sql`
      CREATE TABLE IF NOT EXISTS flashcards (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Created flashcards table');

    await sql`DELETE FROM flashcards`;
    console.log('✓ Cleared existing flashcards');

    for (const card of defaultFlashcards) {
      await sql`
        INSERT INTO flashcards (question, answer)
        VALUES (${card.question}, ${card.answer})
      `;
    }
    console.log(`✓ Seeded ${defaultFlashcards.length} flashcards`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
