"use client";
import { useState } from "react";

export default function VisualizadorImagens(props: { imagens: string[]; onClose: () => void }) {
  const { imagens, onClose } = props;
  const [atual, setAtual] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl z-10">✕</button>

      {imagens.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); setAtual((atual - 1 + imagens.length) % imagens.length); }}
          className="absolute left-4 text-white text-4xl hover:scale-110 transition-transform z-10">‹</button>
      )}

      <img src={imagens[atual]} className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />

      {imagens.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); setAtual((atual + 1) % imagens.length); }}
          className="absolute right-4 text-white text-4xl hover:scale-110 transition-transform z-10">›</button>
      )}

      {imagens.length > 1 && (
        <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
          {atual + 1} / {imagens.length}
        </div>
      )}
    </div>
  );
}