"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Usuario = {
  email: string;
  nome: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  registrar: (email: string, senha: string, nome: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [contas, setContas] = useState<Record<string, { senha: string; nome: string }>>({});

  useEffect(() => {
    const saved = localStorage.getItem("contas");
    if (saved) setContas(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("usuario");
    if (saved) setUsuario(JSON.parse(saved));
  }, []);

  const login = (email: string, senha: string) => {
    const conta = contas[email];
    if (conta && conta.senha === senha) {
      setUsuario({ email, nome: conta.nome });
      localStorage.setItem("usuario", JSON.stringify({ email, nome: conta.nome }));
      return true;
    }
    return false;
  };

  const registrar = (email: string, senha: string, nome: string) => {
    if (contas[email]) return false;
    const novasContas = { ...contas, [email]: { senha, nome } };
    setContas(novasContas);
    localStorage.setItem("contas", JSON.stringify(novasContas));
    setUsuario({ email, nome });
    localStorage.setItem("usuario", JSON.stringify({ email, nome }));
    return true;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
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