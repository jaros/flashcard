import { NextRequest, NextResponse } from 'next/server';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '@/app/lib/db';

export async function GET() {
  try {
    const flashcards = await getFlashcards();
    return NextResponse.json(flashcards);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const newCard = await createFlashcard(question, answer);
    return NextResponse.json(newCard, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, question, answer } = await request.json();

    if (!id || !question || !answer) {
      return NextResponse.json(
        { error: 'ID, question, and answer are required' },
        { status: 400 }
      );
    }

    const updatedCard = await updateFlashcard(id, question, answer);

    if (!updatedCard) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCard);
  } catch {
    return NextResponse.json({ error: 'Failed to update flashcard' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deleted = await deleteFlashcard(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete flashcard' }, { status: 500 });
  }
}
