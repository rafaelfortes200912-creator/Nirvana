"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/app/lib/supabase";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  precoOriginal?: number;
  descricao: string;
  imagem: string;
  categoria: string;
  estoque: number;
};

type AdminContextType = {
  produtos: Produto[];
  adicionar: (p: Omit<Produto, "id">) => Promise<void>;
  editar: (id: number, p: Partial<Produto>) => Promise<void>;
  remover: (id: number) => Promise<void>;
  carregando: boolean;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    const { data } = await supabase.from("produtos").select("*").order("id");
    if (data) setProdutos(data.map(p => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      precoOriginal: p.preco_original,
      descricao: p.descricao,
      imagem: p.imagem,
      categoria: p.categoria,
      estoque: p.estoque,
    })));
    setCarregando(false);
  };

  useEffect(() => { carregar(); }, []);

  const adicionar = async (p: Omit<Produto, "id">) => {
    const { data } = await supabase.from("produtos").insert({
      id: Date.now(),
      nome: p.nome,
      preco: p.preco,
      preco_original: p.precoOriginal,
      descricao: p.descricao,
      imagem: p.imagem,
      categoria: p.categoria,
      estoque: p.estoque,
    }).select();
    if (data) carregar();
  };

  const editar = async (id: number, p: Partial<Produto>) => {
    await supabase.from("produtos").update({
      nome: p.nome,
      preco: p.preco,
      preco_original: p.precoOriginal,
      descricao: p.descricao,
      imagem: p.imagem,
      categoria: p.categoria,
      estoque: p.estoque,
    }).eq("id", id);
    carregar();
  };

  const remover = async (id: number) => {
    await supabase.from("produtos").delete().eq("id", id);
    carregar();
  };

  return (
    <AdminContext.Provider value={{ produtos, adicionar, editar, remover, carregando }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin deve estar dentro do AdminProvider");
  return context;
}