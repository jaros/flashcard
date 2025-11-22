export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris"
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    answer: "4"
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter"
  },
  {
    id: 4,
    question: "Who wrote Romeo and Juliet?",
    answer: "William Shakespeare"
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    answer: "Au"
  },
  {
    id: 6,
    question: "What year did the Titanic sink?",
    answer: "1912"
  },
  {
    id: 7,
    question: "What is the smallest unit of life?",
    answer: "Cell"
  },
  {
    id: 8,
    question: "What is the capital of Japan?",
    answer: "Tokyo"
  }
];
