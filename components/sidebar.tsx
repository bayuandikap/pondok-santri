"use client";

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {isOpen && <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">ADMIN PANELS</span>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 transition mx-auto"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 font-medium transition">
          <span className="text-lg">📋</span>
          {isOpen && <span>Task Manager</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
          <span className="text-lg">📊</span>
          {isOpen && <span>Analytics</span>}
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
          <span className="text-lg">⚙️</span>
          {isOpen && <span>Settings</span>}
        </a>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 whitespace-nowrap">
        {isOpen ? 'v1.0.0 — Production' : 'v1'}
      </div>
    </aside>
  );
}