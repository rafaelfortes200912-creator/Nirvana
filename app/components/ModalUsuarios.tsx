"use client";
import { useState, useEffect } from "react";

type UserData = {
  id: string;
  email: string;
  nome: string;
  criado_em: string;
};

export default function ModalUsuarios({ onClose }: { onClose: () => void }) {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);

  useEffect(() => {
    fetch("/api/usuarios").then(r => r.json()).then(setUsuarios);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">👥 Usuários</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-white text-xl">✕</button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-gray-500">
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                <td className="py-2">{u.nome}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.criado_em}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}