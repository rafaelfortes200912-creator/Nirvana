"use client";
import { useParams } from "next/navigation";
import { produtos } from "@/src/data/produtos";
import Link from "next/link";
import { useState } from "react";
import { useCarrinho } from "@/app/contexts/CarrinhoContext";
import { useAvaliacao } from "@/app/contexts/AvaliacaoContext";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProdutoPage() {
  const params = useParams();
  const produto = produtos.find(p => p.id === Number(params.id));
  const { adicionar } = useCarrinho();
  const [noCarrinho, setNoCarrinho] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const estoque = produto?.estoque || 0;

  const { usuario } = useAuth();
  const { getAvaliacoes, adicionarComentario, getMedia } = useAvaliacao();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [texto, setTexto] = useState("");
  const [nota, setNota] = useState(0);
  const avaliacoes = getAvaliacoes(produto!.id);
  const media = getMedia(produto!.id);
  const jaAvaliou = avaliacoes.avaliadores.includes(usuario?.email || "");

  if (!produto) return <p>Produto não encontrado</p>;

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionar({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
    }
    setNoCarrinho(true);
    setTimeout(() => setNoCarrinho(false), 2000);
  };

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-6 px-4 py-2">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-300">Início</Link>
        <span className="mx-2">»</span>
        <Link href={`/categoria/${produto.categoria.toLowerCase()}`} className="hover:text-gray-900 dark:hover:text-gray-300">{produto.categoria}</Link>
        <span className="mx-2">»</span>
        <span className="text-gray-900 dark:text-white">{produto.nome}</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img src={produto.imagem} alt={produto.nome} className="w-80 h-80 object-cover rounded-xl" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{produto.nome}</h1>
          <p className="text-gray-600 mt-2">{produto.descricao}</p>
          {produto.precoOriginal && (
            <p className="text-gray-400 line-through mt-4">Kz {produto.precoOriginal.toFixed(2)}</p>
          )}
          <p className="text-green-600 font-bold text-2xl">Kz {produto.preco.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{estoque} unidades disponíveis</p>

          <div className="flex items-center gap-3 mt-6">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">−</button>
              <input type="number" value={quantidade} 
                onChange={(e) => setQuantidade(Math.min(estoque, Math.max(1, Number(e.target.value))))}
                className="w-14 text-center py-2 bg-transparent text-gray-900 dark:text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
              <button onClick={() => setQuantidade(q => Math.min(estoque, q + 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">+</button>
            </div>
            {estoque > 0 ? (
              <button onClick={handleAdicionar}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-colors ${
                  noCarrinho ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}>
                {noCarrinho ? "✓ Adicionado" : "Adicionar ao Carrinho"}
              </button>
            ) : (
              <p className="px-6 py-3 rounded-lg font-bold text-white bg-red-500 text-center">
                Fora de Estoque
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Avaliações */}
      <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Avaliações</h2>

        <div className="flex items-center gap-2 mb-4">
          <div className="text-yellow-400 text-2xl">
            {[1, 2, 3, 4, 5].map((e) => (
              <span key={e}>{e <= Math.round(media) ? "⭐" : "☆"}</span>
            ))}
          </div>
          <span className="text-gray-500">({avaliacoes.comentarios.length} comentários)</span>
        </div>

        {!mostrarForm && usuario && (
          <button onClick={() => setMostrarForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4">
            {jaAvaliou ? "Comentar" : "Avaliar Produto"}
          </button>
        )}
        {!mostrarForm && !usuario && (
          <p className="text-gray-500 text-sm mb-4">🔒 Faça login para deixar uma avaliação.</p>
        )}

        {mostrarForm && (
          <form onSubmit={(e) => {
            e.preventDefault();
            adicionarComentario(produto!.id, texto, nota);
            setMostrarForm(false);
            setTexto("");
            setNota(0);
          }} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-2">Comentando como <strong>{usuario?.nome}</strong></p>
            <textarea placeholder="Seu comentário" value={texto} onChange={(e) => setTexto(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 mb-2" rows={3} required />

            {!jaAvaliou && (
              <div className="flex gap-1 mb-2 text-2xl">
                {[1, 2, 3, 4, 5].map((e) => (
                  <button type="button" key={e} onClick={() => setNota(e)}>
                    {e <= nota ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Enviar</button>
              <button type="button" onClick={() => setMostrarForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </form>
        )}

        {avaliacoes.comentarios.length === 0 ? (
          <p className="text-gray-500">Nenhum comentário ainda.</p>
        ) : (
          <div className="space-y-3">
            {avaliacoes.comentarios.map((c) => (
              <div key={c.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{c.nome}</span>
                  {c.nota > 0 && <span className="text-yellow-400 text-sm">{"⭐".repeat(c.nota)}</span>}
                  <span className="text-gray-400 text-xs">{c.data}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{c.texto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}