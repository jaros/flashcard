'use client';

import { useState } from 'react';
import { Flashcard } from '@/app/data/flashcards';

interface FlashcardComponentProps {
  card: Flashcard;
}

export default function FlashcardComponent({ card }: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-96 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center text-white">
            <p className="text-sm font-medium mb-4 opacity-75">Question</p>
            <p className="text-3xl font-bold">{card.question}</p>
          </div>
        </div>

        <div
          className="absolute w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-8 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center text-white">
            <p className="text-sm font-medium mb-4 opacity-75">Answer</p>
            <p className="text-3xl font-bold">{card.answer}</p>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-gray-500">Click to flip</p>
    </div>
  );
}
