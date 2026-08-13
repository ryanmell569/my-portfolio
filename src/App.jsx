// src/App.jsx
import React from 'react';
import UIOverlay from './components/UIOverlay';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Background 3D Canvas has been removed here */}
      
      {/* UI Overlay Content */}
      <UIOverlay />
    </main>
  );
}