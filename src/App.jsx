import { useState, useEffect } from "react";
import "./App.css";
import Closing from "./components/closing";
import Input from "./components/input";
import RadioGroup from "./components/radioGroup";
import Button from "./components/button";
import Card from "./components/card";
import EditModal from "./components/modal";
import Footer from "./components/footer";


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ title: "", desc: "", status: "To do" });
  const [filter, setFilter] = useState("To do"); // desktop filter

  // Mobile sidebar open state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title?.trim()) return alert("Masukkan judul dulu.");
    const newTodo = {
      id: Date.now(),
      title: form.title,
      desc: form.desc,
      status: form.status || "To do",
    };
    setTodos((prev) => [newTodo, ...prev]);
    setForm({ title: "", desc: "", status: "To do" });
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin mau menghapus?")) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // open modal with todo data
  const openEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // save from modal
  const handleSaveEdit = (updated) => {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  // filter todos for selected section
  const shownTodos = todos.filter((t) => t.status === filter);

  // sections list
  const sections = ["To do", "In Progress", "Done"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-slate-800">
      {/* top heading bar (for mobile, we include hamburger) */}
      <div className="md:hidden bg-white/0 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">To do List</h2>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100 transition"
        >
          {/* simple hamburger icon */}
          <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Closing text="To do List" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:w-64 bg-white/60 rounded-xl p-4 shadow-sm sticky top-6 self-start">
            <h4 className="font-semibold text-center text-slate-700 mb-4">Sections</h4>
            <div className="flex flex-col gap-3">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`py-2 rounded-md text-left px-3 transition-all duration-200 ${
                    filter === s
                      ? "bg-blue-600 text-white shadow-md transform scale-100"
                      : "bg-white text-slate-700 border"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => setFilter("To do")}
                className="mt-3 text-sm text-center text-blue-600 underline"
              >
                Reset to To do
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="grid gap-3 max-w-xl mx-auto">
                <Input
                  label="Judul"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukan judul..."
                />

                <Input
                  label="Deskripsi"
                  name="desc"
                  type="textarea"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Masukan deskripsi."
                />

                <RadioGroup
                  label="status"
                  name="status"
                  options={sections}
                  value={form.status}
                  onChange={handleChange}
                />

                <div className="text-center">
                  <Button onClick={handleSubmit} variant="primary">
                    Tambah
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid of todos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {shownTodos.length === 0 ? (
                <div className="col-span-full text-center text-slate-500">
                  Tidak ada tugas di "{filter}"
                </div>
              ) : (
                shownTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    desc={todo.desc}
                    status={todo.status}
                    onEdit={() => openEdit(todo)}
                    onDelete={() => handleDelete(todo.id)}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {/* Edit modal */}
      <EditModal
        isOpen={isModalOpen}
        todo={editingTodo}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Mobile Sidebar Overlay (slide in) */}
      {/* We keep this element mounted only when open to avoid interfering with layout */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* sliding panel */}
          <aside
            className="relative w-72 max-w-xs bg-white p-4 shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0"
            style={{ animation: "slide-in 250ms ease-out" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-700">Sections</h4>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-slate-100"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setFilter(s);
                    setMobileSidebarOpen(false); // close after selecting
                  }}
                  className={`py-2 rounded-md text-left px-3 transition-all duration-200 ${
                    filter === s
                      ? "bg-blue-600 text-white shadow-md transform scale-100"
                      : "bg-white text-slate-700 border"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => {
                  setFilter("To do");
                  setMobileSidebarOpen(false);
                }}
                className="mt-3 text-sm text-center text-blue-600 underline"
              >
                Reset to To do
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
