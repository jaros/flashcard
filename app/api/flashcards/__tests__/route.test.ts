import { GET, POST, PUT, DELETE } from '../route';
import { NextRequest } from 'next/server';
import * as db from '@/app/lib/db';

jest.mock('@/app/lib/db');

const mockFlashcards = [
  { id: 1, question: 'Q1', answer: 'A1' },
  { id: 2, question: 'Q2', answer: 'A2' },
];

describe('Flashcard API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/flashcards', () => {
    it('should return flashcards from database', async () => {
      (db.getFlashcards as jest.Mock).mockResolvedValue(mockFlashcards);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockFlashcards);
      expect(db.getFlashcards).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      (db.getFlashcards as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await GET();

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/flashcards', () => {
    it('should create a new flashcard', async () => {
      const newCard = { question: 'New Q', answer: 'New A' };
      const createdCard = { id: 3, ...newCard };
      (db.createFlashcard as jest.Mock).mockResolvedValue(createdCard);

      const request = {
        json: async () => newCard,
      } as unknown as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.question).toBe('New Q');
      expect(data.answer).toBe('New A');
      expect(data.id).toBe(3);
      expect(db.createFlashcard).toHaveBeenCalledWith('New Q', 'New A');
    });

    it('should validate required fields', async () => {
      const invalidCard = { question: 'Q' };

      const request = {
        json: async () => invalidCard,
      } as unknown as NextRequest;

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('should handle database errors', async () => {
      const newCard = { question: 'Q', answer: 'A' };
      (db.createFlashcard as jest.Mock).mockRejectedValue(new Error('DB error'));

      const request = {
        json: async () => newCard,
      } as unknown as NextRequest;

      const response = await POST(request);

      expect(response.status).toBe(500);
    });
  });

  describe('PUT /api/flashcards', () => {
    it('should update an existing flashcard', async () => {
      const updatedCard = { id: 1, question: 'Updated Q', answer: 'Updated A' };
      (db.updateFlashcard as jest.Mock).mockResolvedValue(updatedCard);

      const request = {
        json: async () => updatedCard,
      } as unknown as NextRequest;

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe(1);
      expect(data.question).toBe('Updated Q');
      expect(data.answer).toBe('Updated A');
      expect(db.updateFlashcard).toHaveBeenCalledWith(1, 'Updated Q', 'Updated A');
    });

    it('should return 404 if flashcard not found', async () => {
      const updatedCard = { id: 999, question: 'Q', answer: 'A' };
      (db.updateFlashcard as jest.Mock).mockResolvedValue(null);

      const request = {
        json: async () => updatedCard,
      } as unknown as NextRequest;

      const response = await PUT(request);

      expect(response.status).toBe(404);
    });

    it('should validate required fields', async () => {
      const invalidCard = { id: 1, question: 'Q' };

      const request = {
        json: async () => invalidCard,
      } as unknown as NextRequest;

      const response = await PUT(request);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/flashcards', () => {
    it('should delete a flashcard by id', async () => {
      (db.deleteFlashcard as jest.Mock).mockResolvedValue(true);

      const request = {
        json: async () => ({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(200);
      expect(db.deleteFlashcard).toHaveBeenCalledWith(1);
    });

    it('should return 404 if flashcard not found', async () => {
      (db.deleteFlashcard as jest.Mock).mockResolvedValue(false);

      const request = {
        json: async () => ({ id: 999 }),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(404);
    });

    it('should validate id is provided', async () => {
      const request = {
        json: async () => ({}),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(400);
    });

    it('should handle database errors', async () => {
      (db.deleteFlashcard as jest.Mock).mockRejectedValue(new Error('DB error'));

      const request = {
        json: async () => ({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(500);
    });
  });
});
