"use client";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useHistorico } from "../contexts/HistoricoContext";
import { useAuth } from "../contexts/AuthContext";

export default function ModalCarrinho({ onClose }: { onClose: () => void }) {
  const { itens, remover, total, limpar } = useCarrinho();
  const { adicionarCompra } = useHistorico();
  const { usuario } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">🛒 Carrinho</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-white text-xl">✕</button>
        </div>

        {itens.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
        ) : (
          <>
            {itens.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700">
                <img src={item.imagem} alt={item.nome} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.nome}</p>
                  <p className="text-xs text-gray-500">Kz {item.preco.toFixed(2)} x {item.quantidade}</p>
                </div>
                <button onClick={() => remover(item.id)} className="text-red-500 text-sm hover:underline">Remover</button>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-lg font-bold text-gray-900 dark:text-white">Total: Kz {total.toFixed(2)}</p>
            </div>
            {usuario ? (
              <button
                onClick={() => {
                  adicionarCompra({
                    id: Date.now().toString(),
                    data: new Date().toLocaleDateString("pt-PT"),
                    itens: itens.map(i => ({ nome: i.nome, preco: i.preco, quantidade: i.quantidade })),
                    total,
                  });
                  limpar();
                  alert("✅ Compra finalizada com sucesso! Obrigado por comprar na MagicX.");
                }}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Finalizar Compra
              </button>
            ) : (
              <p className="mt-4 text-center text-gray-500 text-sm">🔒 Faça login para finalizar a compra.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}