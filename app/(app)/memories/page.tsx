"use client";

import { useEffect, useState } from "react";
import MemoryCard from "@/components/MemoryCard";

type Memory = {
  id: string;
  title: string;
  content: string;
};

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      const res = await fetch("/api/memories");
      const data = await res.json();
      setMemories(data);
    };

    fetchMemories();
  }, []);

  const handleDelete = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdate = (updated: Memory) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Memories</h1>

      {memories.length === 0 ? (
        <p className="text-gray-500">No memories yet.</p>
      ) : (
        <div className="space-y-4">
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}