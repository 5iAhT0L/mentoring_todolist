import { useEffect, useState } from "react";
import Button from "./button";

export default function EditModal({ isOpen, todo, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("To do");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDesc(todo.desc || "");
      setStatus(todo.status || "To do");
    }
  }, [todo]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Judul tidak boleh kosong");
      return;
    }
    const updated = { ...todo, title: title.trim(), desc: desc.trim(), status };
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white w-[95%] sm:w-96 rounded-xl p-6 shadow-lg z-10">
        <h3 className="text-lg font-semibold mb-3">Edit Task</h3>

        <label className="text-sm font-medium">Judul</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="text-sm font-medium">Deskripsi</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none min-h-[70px] resize-none"
        />

        <label className="text-sm font-medium">Status</label>
        <div className="flex gap-3 my-2">
          {["To do", "In Progress", "Done"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                status === s ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
          <Button variant="danger" onClick={onClose}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
