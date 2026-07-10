"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "./AuthContext";

type Comentario = {
  id: number;
  nome: string;
  texto: string;
  nota: number;
  data: string;
  email: string;
  imagens: string[];
};

type ProdutoAvaliacoes = {
  comentarios: Comentario[];
  avaliadores: string[];
};

type AvaliacaoContextType = {
  getAvaliacoes: (produtoId: number) => ProdutoAvaliacoes;
  adicionarComentario: (produtoId: number, texto: string, nota: number, imagens: string[]) => Promise<boolean>;
  getMedia: (produtoId: number) => number;
};

const AvaliacaoContext = createContext<AvaliacaoContextType | null>(null);

export function AvaliacaoProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const [dados, setDados] = useState<Record<number, ProdutoAvaliacoes>>({});

  const carregarTodas = async () => {
    const { data } = await supabase.from("avaliacoes").select("*").order("id", { ascending: false });
    if (data) {
      const agrupado: Record<number, ProdutoAvaliacoes> = {};
      data.forEach((c: any) => {
        if (!agrupado[c.produto_id]) agrupado[c.produto_id] = { comentarios: [], avaliadores: [] };
        agrupado[c.produto_id].comentarios.push({
          id: c.id,
          nome: c.nome,
          texto: c.texto,
          nota: c.nota,
          data: c.data,
          email: c.email,
          imagens: c.imagens || [],
        });
        if (c.nota > 0) agrupado[c.produto_id].avaliadores.push(c.email);
      });
      setDados(agrupado);
    }
  };

  useEffect(() => { carregarTodas(); }, []);

  const getAvaliacoes = (produtoId: number): ProdutoAvaliacoes => {
    return dados[produtoId] || { comentarios: [], avaliadores: [] };
  };

  const adicionarComentario = async (produtoId: number, texto: string, nota: number, imagens: string[]) => {
    if (!usuario) return false;
    const atual = getAvaliacoes(produtoId);
    const jaAvaliou = atual.avaliadores.includes(usuario.email);

    const { error } = await supabase.from("avaliacoes").insert({
      id: Date.now(),
      produto_id: produtoId,
      nome: usuario.nome,
      email: usuario.email,
      texto,
      nota: jaAvaliou ? 0 : nota,
      data: new Date().toLocaleDateString("pt-PT"),
      imagens,
    });

    if (error) return false;
    await carregarTodas();
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