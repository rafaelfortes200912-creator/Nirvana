"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useAuth } from "../contexts/AuthContext";
import ModalCarrinho from "./ModalCarrinho";
import ModalHistorico from "./ModalHistorico";
import ModalLogin from "./ModalLogin";
import { objetivoLoja } from "@/src/data/banners";

const categorias = [
  { nome: "Resistores", href: "/categoria/resistores" },
  { nome: "Capacitores", href: "/categoria/capacitores" },
  { nome: "Semicondutores", href: "/categoria/semicondutores" },
  { nome: "Circuitos Integrados", href: "/categoria/circuitos" },
  { nome: "Conectores e Jumpers", href: "/categoria/conectores" },
  { nome: "Ferramentas", href: "/categoria/ferramentas" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const { quantidadeTotal } = useCarrinho();
  const { usuario } = useAuth();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [loginAberto, setLoginAberto] = useState(false);

  return (
    <>
      <header className="bg-gray-900 text-white px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-3 gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src="/MagicX_logo.png" alt="MagicX" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold">MagicX</h1>
          </div>

          <div className="flex-1 overflow-hidden mx-4 hidden sm:block bg-gray-800 rounded-full">
            <div className="animate-marquee whitespace-nowrap py-1">
              <p className="text-gray-300 text-xs inline-block">{objetivoLoja} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {objetivoLoja}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => usuario ? router.push("/perfil") : setLoginAberto(true)}
              className="flex items-center gap-1 hover:text-gray-300 transition-colors text-xl"
              title={usuario ? `Perfil (${usuario.nome})` : "Entrar"}>
              👤
            </button>
            {usuario && <span className="text-xs text-gray-400 hidden sm:block">{usuario.nome}</span>}
            <button onClick={() => setHistoricoAberto(!historicoAberto)} className="hover:text-gray-300 transition-colors text-2xl">
              📄
            </button>
            <div className="relative">
              <button onClick={() => setCarrinhoAberto(!carrinhoAberto)} className="hover:text-gray-300 transition-colors text-2xl">
                🛒
              </button>
              {quantidadeTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {quantidadeTotal}
                </span>
              )}
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className={`hover:text-gray-300 transition-colors ${pathname === "/" ? "text-blue-200 font-bold" : ""}`}>
            Início
          </Link>

          <div className="relative">
            <button onClick={() => setMenuAberto(!menuAberto)} className="hover:text-gray-300 transition-colors flex items-center gap-1">
              Categorias ▾
            </button>
            {menuAberto && (
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg py-2 w-48 z-50">
                {categorias.map((cat) => (
                  <Link key={cat.href} href={cat.href} onClick={() => setMenuAberto(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                    {cat.nome}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      {carrinhoAberto && <ModalCarrinho onClose={() => setCarrinhoAberto(false)} />}
      {historicoAberto && <ModalHistorico onClose={() => setHistoricoAberto(false)} />}
      {loginAberto && <ModalLogin onClose={() => setLoginAberto(false)} />}
    </>
  );
}