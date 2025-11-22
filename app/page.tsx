'use client';

import { useState } from 'react';
import FlashcardComponent from '@/app/components/FlashcardComponent';
import { useFlashcards } from '@/app/hooks/useFlashcards';
import Link from 'next/link';

export default function Home() {
  const { flashcards, loading } = useFlashcards();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  };

  if (loading || flashcards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <p className="text-gray-600 dark:text-gray-400">Loading flashcards...</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = `${currentIndex + 1} / ${flashcards.length}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black font-sans p-4">
      <main className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Flashcards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{progress}</p>
        </div>

        <div className="mb-8">
          <FlashcardComponent key={currentCard.id} card={currentCard} />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={goToPrevious}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={goToNext}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {flashcards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/admin"
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Admin Panel
          </Link>
        </div>
      </main>
    </div>
  );
}
