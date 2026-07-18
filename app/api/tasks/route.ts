import { NextResponse } from 'next/server';

// Updated data shape for the Activity Scheduler
let events = [
  { id: '1', name: 'Morning Cycling Session (MSK)', startTime: '06:00', duration: '90 mins' },
  { id: '2', name: 'Review Digital Brand Deliverables', startTime: '08:30', duration: '60 mins' },
  { id: '3', name: 'Client Feedback Sync: Logo Overhaul', startTime: '10:00', duration: '45 mins' },
  { id: '4', name: 'UI Vector Rendering & Assets Export', startTime: '11:15', duration: '' }, // Duration is optional
  { id: '5', name: 'Lunch Break & Community Connect', startTime: '12:15', duration: '60 mins' },
  { id: '6', name: 'Table Tennis Training: Forehand Drills', startTime: '14:00', duration: '120 mins' },
  { id: '7', name: 'Cinematic Portrait Color Grading Workflow', startTime: '16:30', duration: '90 mins' },
  { id: '8', name: 'AI Generation & Photo Restoration Queue', startTime: '18:30', duration: '' }, 
  { id: '9', name: 'Tournament Organizer Coordination Call', startTime: '20:00', duration: '45 mins' },
  { id: '10', name: 'System Backup & Push Code to Vercel', startTime: '21:30', duration: '30 mins' }
];

export async function GET() {
  // Sort chronologically by start time before serving
  const sortedEvents = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));
  return NextResponse.json(sortedEvents);
}

export async function POST(request: Request) {
  try {
    const { name, startTime, duration } = await request.json();
    if (!name || !startTime) return NextResponse.json({ error: 'Name and Start Time are required' }, { status: 400 });

    const newEvent = {
      id: Date.now().toString(),
      name,
      startTime,
      duration: duration || ''
    };
    events.push(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, startTime, duration } = await request.json();
    events = events.map(evt => evt.id === id ? { ...evt, name, startTime, duration } : evt);
    return NextResponse.json({ message: 'Event rescheduled successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    events = events.filter(evt => evt.id !== id);
    return NextResponse.json({ message: 'Event removed successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 });
  }
}