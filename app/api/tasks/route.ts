import { NextResponse } from 'next/server';

// Simple in-memory storage array acting as our local database
let tasks = [
  { id: '1', title: 'Learn Next.js App Router', description: 'Understand layouts, pages, and API routes.' },
  { id: '2', title: 'Master Tailwind CSS', description: 'Build stunning UI fast using utility classes.' }
];

// READ (Get all tasks)
export async function GET() {
  return NextResponse.json(tasks);
}

// CREATE (Add a new task)
export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const newTask = {
      id: Date.now().toString(),
      title,
      description: description || ''
    };
    tasks.push(newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

// UPDATE & DELETE Handler
export async function PUT(request: Request) {
  try {
    const { id, title, description } = await request.json();
    tasks = tasks.map(task => task.id === id ? { ...task, title, description } : task);
    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    tasks = tasks.filter(task => task.id !== id);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  }
}