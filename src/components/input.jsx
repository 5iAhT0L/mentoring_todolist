function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col">
      {label && <h3 className="text-sm font-medium mb-1 text-slate-700">{label}</h3>}
      {type === "textarea" ? (
        <textarea
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none min-h-[90px]"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default Input;
