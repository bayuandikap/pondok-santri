"use client";

import { useState, useEffect } from 'react';

interface ScheduledEvent {
  id: string;
  name: string;
  startTime: string;
  duration: string;
}

export default function SchedulerPage() {
  const [events, setEvents] = useState<ScheduledEvent[]>([]);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/tasks'); // Points to our route handler file
    const data = await res.json();
    setEvents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startTime) return;
    setLoading(true);

    const payload = { id: editingId, name, startTime, duration };

    await fetch('/api/tasks', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setEditingId(null);
    setName('');
    setStartTime('');
    setDuration('');
    fetchEvents();
    setLoading(false);
  };

  const handleEdit = (evt: ScheduledEvent) => {
    setEditingId(evt.id);
    setName(evt.name);
    setStartTime(evt.startTime);
    setDuration(evt.duration);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this event from today\'s timeline?')) return;
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchEvents();
  };

  return (
    <div className="p-6 md:p-8 space-y-6 text-slate-800 max-w-5xl mx-auto">
      {/* Dynamic Counter Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity Scheduler</h1>
          <p className="text-slate-500 text-sm mt-0.5">Chronological timeline allocation for production blockouts.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 font-semibold text-sm shrink-0">
          📅 Total Slots Slated: {events.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Module */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {editingId ? '⚡ Edit Time Slot' : '➕ Slate New Activity'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Event Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Creative Sync"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none bg-slate-50/50"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none bg-slate-50/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Duration <span className="text-slate-400 lowercase font-normal">(opt)</span></label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 45 mins"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition outline-none bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName('');
                    setStartTime('');
                    setDuration('');
                  }}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-sm transition"
              >
                {loading ? 'Processing...' : editingId ? 'Update Slot' : 'Schedule Event'}
              </button>
            </div>
          </form>
        </div>

        {/* Timeline Records Module */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 px-1">Today's Timeline</h2>

          {events.length === 0 ? (
            <div className="text-slate-400 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
              <span className="text-2xl block mb-2">⏳</span>
              <p className="text-sm">No scheduled events found for today.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 py-2">
              {events.map((evt) => (
                <div key={evt.id} className="relative group">
                  {/* Timeline node node indicator */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 group-hover:bg-indigo-600 transition shadow-sm" />
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          ⏰ {evt.startTime}
                        </span>
                        {evt.duration && (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            ⏳ {evt.duration}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-900 text-base pt-0.5">{evt.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleEdit(evt)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                        title="Edit entry"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(evt.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove entry"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}