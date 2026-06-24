"use client";
import { useParams } from "next/navigation";
import { produtos } from "@/src/data/produtos";
import Link from "next/link";
import { useState } from "react";

export default function ProdutoPage() {
  const params = useParams();
  const produto = produtos.find(p => p.id === Number(params.id));
  const [noCarrinho, setNoCarrinho] = useState(false);

  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-6 px-4 py-2">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-300">Início</Link>
        <span className="mx-2">»</span>
        <span className="text-gray-900 dark:text-white">{produto.nome}</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Coluna da imagem */}
        <div className="flex-shrink-0">
          <img src={produto.imagem} alt={produto.nome} className="w-80 h-80 object-cover rounded-xl" />
        </div>

        {/* Coluna das informações */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{produto.nome}</h1>
          <p className="text-gray-600 mt-2">{produto.descricao}</p>
          {produto.precoOriginal && (
            <p className="text-gray-400 line-through mt-4">R$ {produto.precoOriginal.toFixed(2)}</p>
          )}
          <p className="text-green-600 font-bold text-2xl">R$ {produto.preco.toFixed(2)}</p>

          <button onClick={() => setNoCarrinho(!noCarrinho)}
            className={`mt-6 px-6 py-3 rounded-lg font-bold text-white transition-colors w-fit ${
              noCarrinho ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {noCarrinho ? "✓ Adicionado" : "Adicionar ao Carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}