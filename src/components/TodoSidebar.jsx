import React, { useRef } from "react";

/**
 * Simple static TodoSidebar (no sliding animation)
 * Props:
 *  - sections: array of section names (default ["To do","In Progress","Done"])
 *  - filter: current selected section (string)
 *  - setFilter: function to set selected section
 *  - counts: object { "To do": num, "In Progress": num, "Done": num }
 *  - setMobileSidebarOpen: optional fn to close mobile overlay when selecting (pass from parent)
 */
export default function TodoSidebar({
  sections = ["To do", "In Progress", "Done"],
  filter,
  setFilter,
  counts = {},
  setMobileSidebarOpen,
}) {
  const itemRefs = useRef({});

  const handleClick = (s) => {
    setFilter(s);
    if (setMobileSidebarOpen) setMobileSidebarOpen(false);
  };

  const onKeyDown = (e, idx) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % sections.length;
      itemRefs.current[sections[next]]?.focus();
      setFilter(sections[next]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + sections.length) % sections.length;
      itemRefs.current[sections[prev]]?.focus();
      setFilter(sections[prev]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFilter(sections[idx]);
      if (setMobileSidebarOpen) setMobileSidebarOpen(false);
    }
  };

  return (
    <aside
      className="md:w-64 bg-white/60 rounded-xl p-4 shadow-sm top-6 self-start relative overflow-visible max-[747px]:hidden"
      aria-label="Sections"
    >
      <h4 className="font-semibold text-center text-slate-700 mb-4">
        Sections
      </h4>

      <div className="relative z-10 flex flex-col gap-3">
        {sections.map((s, i) => {
          const isActive = filter === s;
          return (
            <button
              key={s}
              ref={(el) => (itemRefs.current[s] = el)}
              onClick={() => handleClick(s)}
              onKeyDown={(e) => onKeyDown(e, i)}
              aria-current={isActive || undefined}
              className={`relative py-2 rounded-md text-left px-3 transition-all duration-150 flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-blue-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-700 border"
                }`}
            >
              <span className="flex items-center gap-2 z-10">
                <span className="text-sm whitespace-nowrap">{s}</span>
              </span>

              {/* badge on the right */}
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-xs font-medium rounded-full px-2 py-0.5 shadow z-30
                  ${
                    (counts[s] ?? 0) > 0
                      ? "bg-white text-blue-600"
                      : "bg-white/80 text-slate-500"
                  }`}
                aria-hidden="true"
              >
                {counts[s] ?? 0}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => {
            setFilter("To do");
            if (setMobileSidebarOpen) setMobileSidebarOpen(false);
          }}
          className="mt-3 text-sm text-center text-blue-600 underline"
        >
          Reset to To do
        </button>
      </div>
    </aside>
  );
}
