type Memory = {
  id: string;
  title: string;
  content: string;
};

export default function MemoryCard({
  memory,
  onEdit,
  onDelete,
}: {
  memory: Memory;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold">{memory.title}</h3>
      <p className="text-sm text-gray-600">{memory.content}</p>

      <div className="flex gap-3 mt-2">
        <button onClick={onEdit} className="text-blue-600">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}