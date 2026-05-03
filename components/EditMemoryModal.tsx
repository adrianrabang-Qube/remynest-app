"use client";

import { useState } from "react";

type Memory = {
  id: string;
  title: string;
  content: string;
};

export default function EditMemoryModal({
  memory,
  onClose,
  onUpdate,
}: {
  memory: Memory;
  onClose: () => void;
  onUpdate: (data: { title: string; content: string }) => Promise<void>;
}) {
  const [title, setTitle] = useState(memory.title);
  const [content, setContent] = useState(memory.content);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    await onUpdate({ title, content });
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h2 className="text-lg font-semibold">Edit Memory</h2>

        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-4 py-2"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}