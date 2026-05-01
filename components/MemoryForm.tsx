export default function MemoryForm() {
  return (
    <div className="card">
      <div className="space-y-4">
        <input
          placeholder="Title"
          className="input"
        />

        <textarea
          placeholder="Content"
          className="input h-24"
        />

        <button className="btn-primary">
          Save Memory
        </button>
      </div>
    </div>
  );
}