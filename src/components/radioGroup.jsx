export default function RadioGroup({ label, name, options, value, onChange }) {
  return (
    <div className="mb-4">
      {label && <p className="mb-2 font-medium text-gray-700 text-center">{label}</p>}

      {/* Column on extra small screens, row on small+ screens, centered */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        {options.map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer select-none px-1 py-1 rounded"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="h-4 w-4 text-blue-500"
            />
            {/* prevent the label text from wrapping into two lines on narrow screens */}
            <span className="text-sm whitespace-nowrap">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
