"use client";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ModalLogin({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [erro, setErro] = useState("");
  const { login, registrar } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let sucesso;
    if (modoRegistro) {
      sucesso = registrar(email, senha, nome);
      if (!sucesso) setErro("Este e-mail já está registado.");
    } else {
      sucesso = login(email, senha);
      if (!sucesso) setErro("E-mail ou senha incorretos.");
    }
    if (sucesso) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {modoRegistro ? "Criar Conta" : "Entrar"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {modoRegistro && (
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
          )}
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}
            className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {modoRegistro ? "Registrar" : "Entrar"}
          </button>
        </form>
        <button onClick={() => { setModoRegistro(!modoRegistro); setErro(""); }}
          className="text-sm text-blue-500 hover:underline mt-2">
          {modoRegistro ? "Já tenho conta" : "Criar nova conta"}
        </button>
        <button onClick={onClose} className="text-gray-500 text-sm hover:underline mt-1">Cancelar</button>
      </div>
    </div>
  );
}