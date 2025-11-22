'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFlashcards } from '@/app/hooks/useFlashcards';

export default function AdminPage() {
  const { flashcards, loading, addFlashcard, updateFlashcard, deleteFlashcard } = useFlashcards();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (editingId !== null) {
      await updateFlashcard(editingId, question, answer);
      setEditingId(null);
    } else {
      await addFlashcard(question, answer);
    }

    setQuestion('');
    setAnswer('');
  };

  const handleEdit = (id: number, q: string, a: string) => {
    setEditingId(id);
    setQuestion(q);
    setAnswer(a);
  };

  const handleCancel = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Back to Flashcards
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {editingId !== null ? 'Edit Flashcard' : 'Add New Flashcard'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter the question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter the answer"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    {editingId !== null ? 'Update' : 'Add'}
                  </button>
                  {editingId !== null && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                All Flashcards ({flashcards.length})
              </h2>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {flashcards.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No flashcards yet. Create one!</p>
                ) : (
                  flashcards.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        editingId === card.id
                          ? 'bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Q: {card.question}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            A: {card.answer}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(card.id, card.question, card.answer)}
                            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteFlashcard(card.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
