"use client";
import { useState } from "react";
import { produtos } from "@/src/data/produtos";
import Link from "next/link";
import BannerCarrossel from "./components/BannerCarrossel";
import { banners } from "@/src/data/banners";

export default function Home() {
  const [busca, setBusca] = useState("");
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <BannerCarrossel banners={banners} />

      {/* Input de busca FORA do grid */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid com produtos filtrados */}
      <div id="produtos" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 pb-16">
        {produtosFiltrados.map((produto) => (
          <Link href={`/produto/${produto.id}`} key={produto.id} className="block">
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center relative hover:scale-105 transition-transform">
              <img src={produto.imagem} alt={produto.nome} className="w-36 h-36 object-cover rounded-lg" />
              <h3 className="font-semibold text-base mt-2 truncate w-full" title={produto.nome}>
                {produto.nome}
              </h3>
              {produto.precoOriginal && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full absolute top-1 left-1">
                  -{Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
                </span>
              )}
              {produto.precoOriginal && (
                <p className="text-gray-400 text-xs line-through">Kz {produto.precoOriginal.toFixed(2)}</p>
              )}
              <p className="text-green-600 font-bold text-base">Kz {produto.preco.toFixed(2)}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}