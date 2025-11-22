import { useState, useEffect } from 'react';
import { Flashcard } from '@/app/data/flashcards';

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flashcards');
      if (!response.ok) throw new Error('Failed to fetch flashcards');
      const data = await response.json();
      setFlashcards(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  const addFlashcard = async (question: string, answer: string) => {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
      if (!response.ok) throw new Error('Failed to add flashcard');
      await loadFlashcards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const updateFlashcard = async (id: number, question: string, answer: string) => {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, question, answer }),
      });
      if (!response.ok) throw new Error('Failed to update flashcard');
      await loadFlashcards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteFlashcard = async (id: number) => {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete flashcard');
      await loadFlashcards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return { flashcards, loading, error, addFlashcard, updateFlashcard, deleteFlashcard };
}
