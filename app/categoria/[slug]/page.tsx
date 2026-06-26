import { produtos } from "@/src/data/produtos";
import Link from "next/link";

const nomesCategorias: Record<string, string> = {
  resistores: "Resistores",
  capacitores: "Capacitores",
  semicondutores: "Semicondutores",
  circuitos: "Circuitos Integrados",
  conectores: "Conectores e Jumpers",
  ferramentas: "Ferramentas",
};

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nomeCategoria = nomesCategorias[slug] || slug;
  const produtosFiltrados = produtos.filter(
    (p) => p.categoria.toLowerCase() === nomeCategoria.toLowerCase()
  );

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-6 px-4 py-2">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-300">Início</Link>
        <span className="mx-2">»</span>
        <span className="text-gray-900 dark:text-white">{nomeCategoria}</span>
      </nav>

      <h1 className="text-2xl font-bold px-4 mb-6">{nomeCategoria}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 pb-16">
        {produtosFiltrados.map((produto) => (
          <Link href={`/produto/${produto.id}`} key={produto.id} className="block h-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden relative hover:scale-105 transition-transform flex flex-col h-full">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" />
              </div>
              {produto.precoOriginal && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full absolute top-2 left-2">
                  -{Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
                </span>
              )}
              <div className="p-3 flex flex-col gap-1">
                <h3 className="font-semibold text-base truncate w-full" title={produto.nome}>{produto.nome}</h3>
                {produto.precoOriginal && (
                  <p className="text-gray-400 text-xs line-through">Kz {produto.precoOriginal.toFixed(2)}</p>
                )}
                <p className="text-green-600 font-bold text-lg">Kz {produto.preco.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}