"use client";

import { useState } from 'react';

export default function Sidebar() {
  // Set default state to false so the sidebar initializes auto-folded
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {isOpen && <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">DASHBOARD</span>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 transition mx-auto text-xs"
          title={isOpen ? "Collapse Menu" : "Expand Menu"}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 font-medium transition justify-start" title="Activity Scheduler">
          <span className="text-lg shrink-0">📅</span>
          {isOpen && <span className="truncate">Scheduler</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition justify-start" title="Analytics Data">
          <span className="text-lg shrink-0">📊</span>
          {isOpen && <span className="truncate">Analytics</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition justify-start" title="System Settings">
          <span className="text-lg shrink-0">⚙️</span>
          {isOpen && <span className="truncate">Settings</span>}
        </a>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center truncate">
        {isOpen ? 'v1.0.0 — Production' : 'v1'}
      </div>
    </aside>
  );
}