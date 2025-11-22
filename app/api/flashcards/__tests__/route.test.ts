import { GET, POST, PUT, DELETE } from '../route';
import { NextRequest } from 'next/server';
import fs from 'fs';

jest.mock('fs');

const mockFlashcards = [
  { id: 1, question: 'Q1', answer: 'A1' },
  { id: 2, question: 'Q2', answer: 'A2' },
];

describe('Flashcard API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/flashcards', () => {
    it('should return flashcards from JSON file if it exists', async () => {
      const mockData = JSON.stringify(mockFlashcards);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockFlashcards);
    });

    it('should return default flashcards if JSON file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should handle errors gracefully', async () => {
      (fs.existsSync as jest.Mock).mockImplementation(() => {
        throw new Error('File system error');
      });

      const response = await GET();

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/flashcards', () => {
    it('should create a new flashcard and assign an ID', async () => {
      const newCard = { question: 'New Q', answer: 'New A' };
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => newCard,
      } as unknown as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.question).toBe('New Q');
      expect(data.answer).toBe('New A');
      expect(data.id).toBe(3);
    });

    it('should persist the new flashcard to file', async () => {
      const newCard = { question: 'New Q', answer: 'New A' };
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => newCard,
      } as unknown as NextRequest;

      await POST(request);

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
      expect(writeCall[0]).toContain('flashcards.json');
      const writtenData = JSON.parse(writeCall[1]);
      expect(writtenData).toHaveLength(3);
      expect(writtenData[2].id).toBe(3);
    });

    it('should handle errors during POST', async () => {
      const newCard = { question: 'New Q', answer: 'New A' };
      (fs.existsSync as jest.Mock).mockImplementation(() => {
        throw new Error('File system error');
      });

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
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => updatedCard,
      } as unknown as NextRequest;

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.id).toBe(1);
      expect(data.question).toBe('Updated Q');
      expect(data.answer).toBe('Updated A');
    });

    it('should return 404 if flashcard not found', async () => {
      const updatedCard = { id: 999, question: 'Q', answer: 'A' };
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));

      const request = {
        json: async () => updatedCard,
      } as unknown as NextRequest;

      const response = await PUT(request);

      expect(response.status).toBe(404);
    });

    it('should persist the updated flashcard to file', async () => {
      const updatedCard = { id: 1, question: 'Updated Q', answer: 'Updated A' };
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => updatedCard,
      } as unknown as NextRequest;

      await PUT(request);

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      expect(writtenData[0]).toEqual(updatedCard);
    });
  });

  describe('DELETE /api/flashcards', () => {
    it('should delete a flashcard by id', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => ({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(200);
    });

    it('should remove the flashcard from storage', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockFlashcards));
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      const request = {
        json: async () => ({ id: 1 }),
      } as unknown as NextRequest;

      await DELETE(request);

      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      expect(writtenData).toHaveLength(1);
      expect(writtenData[0].id).toBe(2);
    });

    it('should handle errors during DELETE', async () => {
      (fs.existsSync as jest.Mock).mockImplementation(() => {
        throw new Error('File system error');
      });

      const request = {
        json: async () => ({ id: 1 }),
      } as unknown as NextRequest;

      const response = await DELETE(request);

      expect(response.status).toBe(500);
    });
  });
});
