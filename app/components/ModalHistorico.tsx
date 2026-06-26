"use client";
import { useHistorico } from "../contexts/HistoricoContext";

export default function ModalHistorico({ onClose }: { onClose: () => void }) {
  const { compras } = useHistorico();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">📄 Histórico de Compras</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-white text-xl">✕</button>
        </div>

        {compras.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhuma compra realizada.</p>
        ) : (
          compras.map((compra) => (
            <div key={compra.id} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{compra.data}</span>
                <span className="text-xs text-gray-500">ID: {compra.id}</span>
              </div>
              {compra.itens.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{item.nome} x{item.quantidade}</span>
                  <span>Kz {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2 text-right font-bold text-green-600">
                Total: Kz {compra.total.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}