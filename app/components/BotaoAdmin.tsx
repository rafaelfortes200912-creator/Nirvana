"use client";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function BotaoAdmin({ onAbrir }: { onAbrir: () => void }) {
  const { usuario } = useAuth();

  if (!usuario?.admin) return null;

  return (
    <button
      onClick={onAbrir}
      className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors text-2xl"
      title="Gerir Stock"
    >
      ⚙️
    </button>
  );
}