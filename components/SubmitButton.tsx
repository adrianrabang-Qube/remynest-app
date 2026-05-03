"use client";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  className?: string;
};

export default function SubmitButton({
  children,
  onClick,
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onClick?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded text-white transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {loading ? "Saving..." : children}
    </button>
  );
}