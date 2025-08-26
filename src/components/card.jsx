import Button from "./button";

function Card({ id, title, desc, status, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center space-y-3 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-slate-600 min-h-[48px]">{desc}</p>
      <p className="text-xs mt-2 text-blue-600 font-medium">{status}</p>

      <div className="flex justify-center gap-3 mt-2">
        <Button variant="warning" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Hapus
        </Button>
      </div>
    </div>
  );
}

export default Card;
