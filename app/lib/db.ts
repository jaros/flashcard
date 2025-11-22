import { sql } from '@vercel/postgres';

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS flashcards (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function getFlashcards() {
  try {
    const result = await sql`
      SELECT id, question, answer FROM flashcards ORDER BY id
    `;
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch flashcards:', error);
    throw error;
  }
}

export async function getFlashcard(id: number) {
  try {
    const result = await sql`
      SELECT id, question, answer FROM flashcards WHERE id = ${id}
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Failed to fetch flashcard:', error);
    throw error;
  }
}

export async function createFlashcard(question: string, answer: string) {
  try {
    const result = await sql`
      INSERT INTO flashcards (question, answer)
      VALUES (${question}, ${answer})
      RETURNING id, question, answer
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Failed to create flashcard:', error);
    throw error;
  }
}

export async function updateFlashcard(id: number, question: string, answer: string) {
  try {
    const result = await sql`
      UPDATE flashcards
      SET question = ${question}, answer = ${answer}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, question, answer
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Failed to update flashcard:', error);
    throw error;
  }
}

export async function deleteFlashcard(id: number) {
  try {
    const result = await sql`
      DELETE FROM flashcards WHERE id = ${id}
      RETURNING id
    `;
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Failed to delete flashcard:', error);
    throw error;
  }
}
