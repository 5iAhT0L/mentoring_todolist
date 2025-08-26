// src/components/closing.jsx
function Closing({ text = "To do List" }) {
  return (
    <header className="bg-gradient-to-b from-blue-100 via-white to-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          {/* logo box */}
          <div className="w-14 h-14 rounded-lg bg-white/90 shadow-md flex items-center justify-center ring-1 ring-white/60">
            {/* simple calm-blue checklist logo */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="2" y="3" width="20" height="18" rx="3" stroke="#2563EB" strokeWidth="1.2" fill="none"/>
              <path d="M7 9.5L10 12.5L17 6" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* title + subtitle */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">{text}</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">A calm, focused place to manage your tasks</p>
          </div>
        </div>

        {/* small action / badge on the right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
            <span className="text-xs text-slate-600">Tip</span>
            <span className="text-xs font-medium text-blue-600">Use sections to focus</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Closing;
