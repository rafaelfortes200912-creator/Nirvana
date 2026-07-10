"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/app/lib/supabase";

type Usuario = {
  email: string;
  nome: string;
  admin: boolean;
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  registrar: (email: string, senha: string, nome: string, telefone: string, morada: string) => Promise<{ erro?: string; sucesso?: boolean }>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUsuario({
          email: session.user.email!,
          nome: session.user.user_metadata?.nome || "Usuário",
          admin: session.user.email === "admin@magicx.com",
        });
      }
    });
  }, []);

  const login = async (email: string, senha: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error || !data.user) return false;
    setUsuario({
      email: data.user.email!,
      nome: data.user.user_metadata?.nome || "Usuário",
      admin: data.user.email === "admin@magicx.com",
    });
    return true;
  };

  const registrar = async (email: string, senha: string, nome: string, telefone: string, morada: string) => {
    if (senha.length < 6) return { erro: "A senha deve ter pelo menos 6 caracteres." };
    if (!email.includes("@") || !email.includes(".")) return { erro: "Email inválido." };

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome, telefone, morada } },
    });

    if (error) return { erro: error.message };
    setUsuario({ email: data.user!.email!, nome, admin: false });
    return { sucesso: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro do AuthProvider");
  return context;
}