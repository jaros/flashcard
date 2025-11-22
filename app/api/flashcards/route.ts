import { NextRequest, NextResponse } from 'next/server';
import { Flashcard } from '@/app/data/flashcards';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'app/data/flashcards.json');

export async function GET() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      const flashcards = JSON.parse(data);
      return NextResponse.json(flashcards);
    } else {
      const { flashcards } = await import('@/app/data/flashcards');
      return NextResponse.json(flashcards);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCard: Flashcard = await request.json();

    let flashcards: Flashcard[] = [];
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      flashcards = JSON.parse(data);
    } else {
      const { flashcards: defaultCards } = await import('@/app/data/flashcards');
      flashcards = [...defaultCards];
    }

    const maxId = flashcards.length > 0 ? Math.max(...flashcards.map(c => c.id)) : 0;
    newCard.id = maxId + 1;

    flashcards.push(newCard);
    fs.writeFileSync(dataFile, JSON.stringify(flashcards, null, 2));

    return NextResponse.json(newCard, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedCard: Flashcard = await request.json();

    let flashcards: Flashcard[] = [];
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      flashcards = JSON.parse(data);
    } else {
      const { flashcards: defaultCards } = await import('@/app/data/flashcards');
      flashcards = [...defaultCards];
    }

    const index = flashcards.findIndex(c => c.id === updatedCard.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    flashcards[index] = updatedCard;
    fs.writeFileSync(dataFile, JSON.stringify(flashcards, null, 2));

    return NextResponse.json(updatedCard);
  } catch {
    return NextResponse.json({ error: 'Failed to update flashcard' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    let flashcards: Flashcard[] = [];
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      flashcards = JSON.parse(data);
    } else {
      const { flashcards: defaultCards } = await import('@/app/data/flashcards');
      flashcards = [...defaultCards];
    }

    flashcards = flashcards.filter(c => c.id !== id);
    fs.writeFileSync(dataFile, JSON.stringify(flashcards, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete flashcard' }, { status: 500 });
  }
}
