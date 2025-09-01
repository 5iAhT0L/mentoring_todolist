// src/components/footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white/90 border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/5i_Aht0L"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md hover:bg-slate-100 transition"
          >
            {/* GitHub SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
              <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53 0-.26-.01-1-.02-1.94-3.08.67-3.73-1.48-3.73-1.48-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.4.11-2.93 0 0 .93-.3 3.05 1.13A10.6 10.6 0 0 1 12 6.8c.94.004 1.89.13 2.78.38 2.12-1.43 3.04-1.13 3.04-1.13.62 1.53.23 2.65.12 2.93.71.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.19-5.08 5.47.39.33.73.97.73 1.96 0 1.41-.01 2.55-.01 2.9 0 .29.2.64.76.53 4.4-1.48 7.56-5.63 7.56-10.53C23.25 5.48 18.27.5 12 .5z"/>
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/Athallah Andhika"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-md hover:bg-slate-100 transition"
          >
            {/* LinkedIn SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1c1.39 0 2.49 1.12 2.49 2.5zM.22 8.98h4.54V24H.22V8.98zM8.98 8.98h4.36v2.06h.06c.61-1.16 2.09-2.38 4.3-2.38 4.6 0 5.45 3.03 5.45 6.96V24h-4.53v-7.07c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24H8.98V8.98z"/>
            </svg>
          </a>
        </div>

        <div className="text-sm text-slate-600 text-center sm:text-right">
          © {year} Athallah Zahwan Andhika · <span className="hidden sm:inline">Built with React & Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
