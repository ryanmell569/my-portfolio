// src/App.jsx
import React from 'react';
import UIOverlay from './components/UIOverlay';

export default function App() {
  return (
    <main className="min-h-screen bg-[#04060a] text-slate-100 relative overflow-x-hidden">
      <UIOverlay />
    </main>
  );
}
