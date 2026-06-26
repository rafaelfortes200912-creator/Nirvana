"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (produto: { id: number; nome: string; preco: number; imagem: string }) => void;
  remover: (id: number) => void;
  total: number;
  quantidadeTotal: number;
  limpar: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const chave = usuario ? `carrinho_${usuario.email}` : "carrinho_visitante";
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(chave);
    if (saved) setItens(JSON.parse(saved));
    else setItens([]);
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(itens));
  }, [itens, chave]);

  const adicionar = (produto: { id: number; nome: string; preco: number; imagem: string }) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === produto.id);
      if (existe) {
        return prev.map((i) => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i);
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const remover = (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const limpar = () => setItens([]);

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
  const quantidadeTotal = itens.reduce((soma, i) => soma + i.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover, total, quantidadeTotal, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error("useCarrinho deve estar dentro do CarrinhoProvider");
  return context;
}