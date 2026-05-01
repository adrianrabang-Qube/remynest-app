"use client";

import { useState } from "react";

type Memory = {
  id: string;
  title: string;
  content: string;
};

export default function MemoryCard({
  memory,
  onDelete,
  onUpdate,
}: {
  memory: Memory;
  onDelete: (id: string) => void;
  onUpdate: (memory: Memory) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(memory.title);
  const [content, setContent] = useState(memory.content);

  const handleDelete = async () => {
    await fetch(`/api/memories/${memory.id}`, {
      method: "DELETE",
    });

    onDelete(memory.id); // instant UI update
  };

  const handleUpdate = async () => {
    await fetch(`/api/memories/${memory.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });

    onUpdate({ ...memory, title, content }); // instant UI update
    setEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-2">
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button onClick={handleUpdate} className="text-green-600 text-sm">
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="font-semibold text-lg">{memory.title}</h2>
          <p className="text-gray-600">{memory.content}</p>
        </>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setEditing(!editing)}
          className="text-blue-500 text-sm"
        >
          {editing ? "Cancel" : "Edit"}
        </button>

        <button onClick={handleDelete} className="text-red-500 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}