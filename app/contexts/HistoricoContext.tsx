"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type Compra = {
  id: string;
  data: string;
  itens: { nome: string; preco: number; quantidade: number }[];
  total: number;
};

type HistoricoContextType = {
  compras: Compra[];
  adicionarCompra: (compra: Compra) => void;
};

const HistoricoContext = createContext<HistoricoContextType | null>(null);

export function HistoricoProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const chave = usuario ? `historico_${usuario.email}` : "historico_visitante";
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(chave);
    if (saved) setCompras(JSON.parse(saved));
    else setCompras([]);
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(compras));
  }, [compras, chave]);

  const adicionarCompra = (compra: Compra) => {
    setCompras((prev) => [compra, ...prev]);
  };

  return (
    <HistoricoContext.Provider value={{ compras, adicionarCompra }}>
      {children}
    </HistoricoContext.Provider>
  );
}

export function useHistorico() {
  const context = useContext(HistoricoContext);
  if (!context) throw new Error("useHistorico deve estar dentro do HistoricoProvider");
  return context;
}