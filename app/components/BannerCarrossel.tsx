"use client";
import { useState } from "react";
import Link from "next/link";
import { Banner } from "@/src/data/banners";

export default function BannerCarrossel({ banners }: { banners: Banner[] }) {
  const [atual, setAtual] = useState(0);
  const banner = banners[atual];

  const proximo = () => setAtual((atual + 1) % banners.length);
  const anterior = () => setAtual((atual - 1 + banners.length) % banners.length);

return (
  <section
    className="relative h-[400px] bg-cover bg-center rounded-b-3xl mb-8"
    style={{ backgroundImage: `url(${banner.imagem})` }}
  >
    {/* Overlay escuro */}
    <div className="absolute inset-0 bg-black/50 rounded-b-3xl" />

    {/* Conteúdo */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.titulo}</h2>
      <p className="text-gray-200 text-lg max-w-xl mx-auto mb-6">{banner.subtitulo}</p>
      <Link href="#produtos" className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
        {banner.textoBotao}
      </Link>
    </div>

    {/* Seta esquerda */}
    <button onClick={anterior} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors">
      ←
    </button>

    {/* Seta direita */}
    <button onClick={proximo} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors">
      →
    </button>
  </section>
);
}