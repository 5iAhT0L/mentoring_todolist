// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Closing from "./components/closing";
import Input from "./components/input";
import RadioGroup from "./components/radioGroup";
import Button from "./components/button";
import Card from "./components/card";
import EditModal from "./components/modal";
import Footer from "./components/footer";
import Sidebar from "./components/TodoSidebar";

import { ToastProvider, useToast } from "./components/toast";

function AppContent() {
  const { addToast } = useToast();

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ title: "", desc: "", status: "To do" });
  const [filter, setFilter] = useState("To do");

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // mobile sidebar
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sections = ["To do", "In Progress", "Done"];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title?.trim()) {
      addToast({
        title: "Gagal",
        description: "Judul tidak boleh kosong",
        type: "error",
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: form.title.trim(),
      desc: form.desc.trim(),
      status: form.status || "To do",
    };
    setTodos((prev) => [newTodo, ...prev]);
    setForm({ title: "", desc: "", status: "To do" });
    addToast({
      title: "Tugas ditambahkan",
      description: `${newTodo.title} → ${newTodo.status}`,
      type: "success",
    });
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin mau menghapus?")) return;
    const deleted = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    addToast({
      title: "Tugas dihapus",
      description: deleted?.title || "",
      type: "info",
    });
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updated) => {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setIsModalOpen(false);
    setEditingTodo(null);
    addToast({
      title: "Tugas diperbarui",
      description: `${updated.title} → ${updated.status}`,
      type: "success",
    });
  };

  // counts for badges
  const counts = {
    "To do": todos.filter((t) => t.status === "To do").length,
    "In Progress": todos.filter((t) => t.status === "In Progress").length,
    Done: todos.filter((t) => t.status === "Done").length,
  };

  const shownTodos = todos.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-slate-800">
      {/* top bar & closing header */}
      <div className="md:hidden bg-white/0 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">To do List</h2>
        <button
          aria-label="Open menu"
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100 transition"
        >
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <Closing text="To do List" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar (animated indicator handled inside component) */}
          <Sidebar
            sections={sections}
            filter={filter}
            setFilter={setFilter}
            counts={counts}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />

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

            {/* Grid */}
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
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-xs bg-white p-4 shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-700">Sections</h4>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-slate-100"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setFilter(s);
                    setMobileSidebarOpen(false);
                  }}
                  className={`py-2 rounded-md text-left px-3 transition-all duration-200 ${
                    filter === s
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-slate-700 border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{s}</span>
                    <span
                      className={`inline-flex items-center justify-center text-xs font-medium rounded-full px-2 py-0.5 ${
                        counts[s] > 0
                          ? "bg-white text-blue-600"
                          : "bg-white/70 text-slate-500"
                      }`}
                    >
                      {counts[s]}
                    </span>
                  </div>
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

// Wrap AppContent with ToastProvider
export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
