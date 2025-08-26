export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const base = "px-4 py-2 rounded-lg text-white font-medium shadow-sm transition-transform duration-150";
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 active:scale-95",
    success: "bg-green-500 hover:bg-green-600 active:scale-95",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-slate-800 active:scale-95",
    danger: "bg-red-500 hover:bg-red-600 active:scale-95",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
