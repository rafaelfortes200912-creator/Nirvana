"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type Comentario = {
  id: number;
  nome: string;
  texto: string;
  nota: number;
  data: string;
};

type ProdutoAvaliacoes = {
  comentarios: Comentario[];
  avaliadores: string[]; // emails que já avaliaram
};

type AvaliacaoContextType = {
  getAvaliacoes: (produtoId: number) => ProdutoAvaliacoes;
  adicionarComentario: (produtoId: number, texto: string, nota: number) => boolean;
  getMedia: (produtoId: number) => number;
};

const AvaliacaoContext = createContext<AvaliacaoContextType | null>(null);

export function AvaliacaoProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const chave = "avaliacoes_loja";
  const [dados, setDados] = useState<Record<number, ProdutoAvaliacoes>>({});

  useEffect(() => {
    const saved = localStorage.getItem(chave);
    if (saved) setDados(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(dados));
  }, [dados]);

  const getAvaliacoes = (produtoId: number): ProdutoAvaliacoes => {
    return dados[produtoId] || { comentarios: [], avaliadores: [] };
  };

  const adicionarComentario = (produtoId: number, texto: string, nota: number) => {
    if (!usuario) return false;
    const atual = getAvaliacoes(produtoId);
    const jaAvaliou = atual.avaliadores.includes(usuario.email);

    const novoComentario: Comentario = {
      id: Date.now(),
      nome: usuario.nome,
      texto,
      nota: jaAvaliou ? 0 : nota,
      data: new Date().toLocaleDateString("pt-PT"),
    };

    setDados(prev => ({
      ...prev,
      [produtoId]: {
        comentarios: [...atual.comentarios, novoComentario],
        avaliadores: jaAvaliou ? atual.avaliadores : [...atual.avaliadores, usuario.email],
      },
    }));

    return true;
  };

  const getMedia = (produtoId: number) => {
    const { comentarios } = getAvaliacoes(produtoId);
    const comNota = comentarios.filter(c => c.nota > 0);
    if (comNota.length === 0) return 0;
    return comNota.reduce((s, c) => s + c.nota, 0) / comNota.length;
  };

  return (
    <AvaliacaoContext.Provider value={{ getAvaliacoes, adicionarComentario, getMedia }}>
      {children}
    </AvaliacaoContext.Provider>
  );
}

export function useAvaliacao() {
  const context = useContext(AvaliacaoContext);
  if (!context) throw new Error("useAvaliacao deve estar dentro do AvaliacaoProvider");
  return context;
}